import ProjectModel from "~~/server/models/project.model";
import { Task } from "~~/server/types/task.types";
import { IUser } from "~~/server/types/user.types";
import { handleError, handleErrorCatch } from "../../../../utils/errorHandler";
import { isValidObjectId } from "mongoose";
import { Project } from "~~/server/types/project.types";
import TaskModel from "~~/server/models/task.model";
import ActivityLogModel from "~~/server/models/activityLog.model";

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user as IUser;

    const { taskId } = event.context.params as { taskId: string };

    if (!isValidObjectId(taskId)) {
      return handleError(event, 400, "Invalid task ID");
    }

    const body = (await readBody(event)) as Task;

    const task = (await TaskModel.findById(taskId)) as Task;

    if (!task) {
      return handleError(event, 404, "Task not found");
    }

    const { title, description, assignedUser, priority, status, dueDate } =
      body;

    const project = (await ProjectModel.findById(task.projectId)) as Project;

    if (!project) {
      return handleError(event, 404, "Project not found");
    }

    // Admin Or Project creator or manager can create task

    if (
      project.createdBy.toString() !== user._id.toString() &&
      user.role !== "Admin" &&
      user.role !== "Manager"
    ) {
      return handleError(
        event,
        403,
        "You are not authorized to create task for this project",
      );
    }

    if (title && (typeof title !== "string" || title.trim() === "")) {
      return handleError(event, 400, "Please provide valid title of the task");
    }

    if (
      description &&
      (typeof description !== "string" || description.trim() === "")
    ) {
      return handleError(
        event,
        400,
        "Please provide valid description of the task",
      );
    }

    if (assignedUser) {
      if (!isValidObjectId(assignedUser)) {
        return handleError(event, 400, "Invalid assigned user ID");
      }
      if (
        !project.assignedUsers.some(
          (user) => user.toString() === assignedUser.toString(),
        )
      ) {
        return handleError(
          event,
          400,
          `User is not assigned to this ${project.name} project`,
        );
      }
    }

    const validPriority = ["Low", "Medium", "High"];
    const validStatus = ["Todo", "In Progress", "Review", "Completed"];

    if (priority && !validPriority.includes(priority)) {
      return handleError(
        event,
        400,
        "Invalid priority value. Allowed values are Low, Medium, High",
      );
    }

    if (status && !validStatus.includes(status)) {
      return handleError(
        event,
        400,
        "Invalid status value. Allowed values are Todo, In Progress, Review, Completed",
      );
    }

    if (dueDate) {
      const parsedDate = new Date(dueDate);

      if (isNaN(parsedDate.getTime())) {
        return handleError(
          event,
          400,
          `Invalid due date format. Please use "YYYY-MM-DD" (e.g., 2026-03-10`,
        );
      }

      if (parsedDate < new Date()) {
        return handleError(event, 400, "Due date cannot be in the past");
      }
    }

    const taskUpdate = await TaskModel.findByIdAndUpdate(taskId, {
      description,
      assignedUser,
      priority,
      status,
      dueDate,
    });

    // task  updated log
    await ActivityLogModel.create({
      userId: user._id,
      actionType: "TASK_UPDATED",
      entityType: "Task",
      entityId: task._id,
    });

    globalThis.io?.to(task.projectId.toString()).emit("taskUpdated", task);

          await clearTaskCache(task.projectId.toString())
    return {
      status: true,
      statusCode: 200,
      message: "Task updated successfully",
      data: taskUpdate,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }
    return handleErrorCatch(500, "Internal Server Error");
  }
});
