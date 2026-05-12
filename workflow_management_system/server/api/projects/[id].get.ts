
import { IUser } from "~~/server/types/user.types";
import { handleError, handleErrorCatch } from "../../utils/errorHandler";
import ProjectModel from "~~/server/models/project.model";

// ============ get particular project by project id ========

export default defineEventHandler(async (event) => {
  try {
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

    return {
      status: true,
      statusCode: 200,
      message: "Project retrieved successfully",
      data: project,
    };
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return handleErrorCatch(500, errMessage);
  }
});
