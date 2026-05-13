import { IUser } from "~~/server/types/user.types";
import { handleError, handleErrorCatch } from "../../utils/errorHandler";
import ProjectModel from "~~/server/models/project.model";
import ActivityLogModel from "~~/server/models/activityLog.model";
import { ActivityLog } from "~~/server/types/activityLog.types";

// ============ delete particular project by project id ========

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user as IUser;

    const projectId = event.context.params?.id as string;

    if (!projectId) {
      return handleError(event, 400, "Project ID is required");
    }

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return handleError(event, 404, "Project not found");
    }

    if (user.role === "Employee") {
      return handleError(event, 403, "Forbidden");
    }

    // userRole == Admin or createdBy  should match with user id
    if (
      user.role === "Manager" &&
      project.createdBy.toString() !== user._id.toString()
    ) {
      return handleError(event, 403, "Forbidden");
    }

    await ProjectModel.findByIdAndDelete(projectId);

    // activity log delete

    (await ActivityLogModel.create({
      userId: user._id,
      actionType: "PROJECT_DELETED",
      entityType: "Project",
      entityId: projectId,
    })) as ActivityLog;

    globalThis.io?.emit("projectUpdated");

    await clearProjectCache(projectId.toString());

    return {
      status: true,
      statusCode: 200,
      message: "Project deleted successfully",
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
