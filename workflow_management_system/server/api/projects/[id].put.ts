import { projectUpdateService } from "~~/server/services/projects/project.service";
import { handleErrorCatch, handleError } from "../../utils/errorHandler";
import { projectSchema } from "../../validators/project.validator";
import { Project } from "~~/server/types/project.types";

//=================== Update project ===============

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params as { id: string };
    console.log("Project ID from params:", id);

    if (!id) {
      return handleError(event, 400, "Project ID is required");
    }

    const body = await readBody(event);

    if (!body) {
      return handleError(event, 400, "Provide project details");
    }

    const validatedData = projectSchema.parse(body);

    if (!event.context.user || !event.context.user._id) {
      return handleError(event, 401, "Unauthorized");
    }

    const userId = event.context.user?._id as string;

    const result = (await projectUpdateService(
      validatedData as Project,
      userId,
      id,
    )) as { status: boolean; message: string; data: Project };

    if (!result.status) {
      return handleError(event, 400, result.message);
    }

    return {
      status: true,
      statusCode: 200,
      message: result.message,
      data: result.data,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
