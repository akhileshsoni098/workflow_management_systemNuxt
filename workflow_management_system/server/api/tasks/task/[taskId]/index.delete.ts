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

    const task = (await TaskModel.findById(taskId)) as Task;

    if (!task) {
      return handleError(event, 404, "Task not found");
    }

    const project = (await ProjectModel.findById(task.projectId)) as Project;

    if (!project) {
      return handleError(event, 404, "Project not found");
    }

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

    await TaskModel.findByIdAndDelete(taskId);

    if (!task) {
      return handleError(event, 404, "Task not found");
    }

    // task deleted log

    await ActivityLogModel.create({
      userId: user._id,
      actionType: "TASK_DELETED",
      entityType: "Task",
      entityId: task._id,
    });

    globalThis.io?.to(task.projectId.toString()).emit("taskDeleted", task);
      await clearTaskCache(task.projectId.toString())
    return {
      status: true,
      statusCode: 200,
      message: "Task deleted successfully",
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
