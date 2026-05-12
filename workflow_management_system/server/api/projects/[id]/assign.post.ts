import ProjectModel from "~~/server/models/project.model";
import { assignUsers } from "~~/server/services/projects/project.service";
import { IUser } from "~~/server/types/user.types";

export default defineEventHandler(async (event) => {
  try {
    const { _id, role } = event.context.user as IUser;

    const { id } = event.context.params as { id: string };

    if (!id) {
      return handleError(event, 400, "Project ID is required");
    }

    const { assignedUserId } = (await readBody(event)) as {
      assignedUserId: string[];
    };

    if (!assignedUserId) {
      return handleError(event, 400, "Assigned User ID is required");
    }

    const validationResult = (await assignUsers(
      assignedUserId as string[],
    )) as {
      status: boolean;
      message: string;
    };

    if (!validationResult.status) {
      return handleError(event, 400, validationResult.message);
    }

    // if manager then check if he is creator of project
    if (role === "Manager") {
      const project = await ProjectModel.findById(id);
      if (!project) {
        return handleError(event, 404, "Project not found");
      }

      if (project.createdBy.toString() !== _id.toString()) {
        return handleError(event, 403, "Forbidden");
      }
    }

    const updatedProject = await ProjectModel.findByIdAndUpdate(
      id,
      { $addToSet: { assignedUsers: { $each: assignedUserId } } },
      { returnDocument: "after" },
    );

    if (!updatedProject) {
      return handleError(event, 404, "Project not found");
    }

    return {
      status: true,
      statusCode: 200,
      message: "Users assigned to project successfully",
      data: updatedProject,
    };
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return handleErrorCatch(500, errMessage);
  }
});
