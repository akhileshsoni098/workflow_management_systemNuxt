import { isValidObjectId } from "mongoose";

import TaskModel from "~~/server/models/task.model";
import ProjectModel from "~~/server/models/project.model";

import { Task } from "~~/server/types/task.types";
import { IUser } from "~~/server/types/user.types";

import { handleError, handleErrorCatch } from "../../../utils/errorHandler";

export interface TaskFilterQuery {
  projectId?: string;
  status?: Task["status"];
  priority?: Task["priority"];
  assignedUser?: string;
}

export default defineEventHandler(async (event) => {
  try {
    // =========================
    // AUTH USER
    // =========================

    const user = event.context.user as IUser;

    // =========================
    // PARAMS
    // =========================

    const { projectId } = getRouterParams(event);

    if (!projectId || !isValidObjectId(projectId)) {
      return handleError(event, 400, "Invalid project ID");
    }

    // =========================
    // QUERY
    // =========================

    const query = getQuery(event);

    const status = query.status as Task["status"] | undefined;

    const priority = query.priority as Task["priority"] | undefined;

    // =========================
    // VALIDATE PROJECT
    // =========================

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return handleError(event, 404, "Project not found");
    }

    const cache = await getCache(
      tasksByProjectKey(user, projectId, query as TaskFilterQuery),
    );

    if (cache) {
      return cache;
    }

    // =========================
    // FILTER
    // =========================

    const filter: TaskFilterQuery = {
      projectId,
    };

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    // Employee can only see
    // assigned tasks

    if (user.role === "Employee") {
      filter.assignedUser = user._id.toString();
    }

    // =========================
    // GET TASKS
    // =========================

    const tasks = await TaskModel.find({ ...filter })
      .populate("assignedUser", "name email")
      .sort({
        dueDate: -1,
      });

    // =========================
    // FORMAT TASKS
    // =========================

    const now = new Date();

    const formattedTasks = tasks.map((task) => {
      let overDue = false;

      let days = 0;

      if (task.dueDate) {
        const due = new Date(task.dueDate);

        if (due < now && task.status !== "Completed") {
          overDue = true;

          const diffTime = now.getTime() - due.getTime();

          days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        }
      }

      return {
        ...task.toObject(),

        overDue,

        overDueBy: overDue ? `${days} day(s)` : null,
      };
    });

    // =========================
    // RESPONSE
    // =========================

    const response = {
      status: true,
      statusCode: 200,
      message: "Tasks retrieved successfully",
      count: formattedTasks.length,
      data: formattedTasks,
    };

    await setCache(
      tasksByProjectKey(user, projectId, query as TaskFilterQuery),
      response,
      60,
    );

    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
