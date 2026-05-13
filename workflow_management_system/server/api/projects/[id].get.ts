import { IUser } from "~~/server/types/user.types";
import { handleError, handleErrorCatch } from "../../utils/errorHandler";
import ProjectModel from "~~/server/models/project.model";
import ActivityLogModel from "~~/server/models/activityLog.model";

// ============ get particular project by project id ========

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user as IUser;
    const role = event.context.user?.role as string;

    if (
      !role ||
      (role !== "Admin" && role !== "Manager" && role !== "Employee")
    ) {
      return handleError(event, 403, "Forbidden");
    }

    const { id } = event.context.params as { id: string };

    if (!id) {
      return handleError(event, 400, "Project ID is required");
    }

    const cache = await getCache(projectDetailsKey(user, id));
    if (cache) {
      console.log("cache hit");
      return cache;
    }

    console.log("cache miss");

    const project = await ProjectModel.findById(id)
      .populate("createdBy", "name email")
      .populate("assignedUsers", "name email");

    if (!project) {
      return handleError(event, 404, "Project not found");
    }

    if (role === "Employee" && project.assignedUsers.length > 0) {
      const isAssigned = (project.assignedUsers as IUser[]).some(
        (assignedUser: IUser) =>
          assignedUser._id.toString() === event.context.user?._id.toString(),
      );

      if (!isAssigned) {
        return handleError(event, 403, "You are not assigned to this project");
      }
    }

    const activitiesDetails = await ActivityLogModel.find({
      entityId: id,
      entityType: "Project",
    }).sort({ createdAt: -1 });

    const response = {
      status: true,
      statusCode: 200,
      message: "Project retrieved successfully",
      data: project,
      activities: activitiesDetails,
    };

    await setCache(projectDetailsKey(user, id), response, 60);

    return response;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
