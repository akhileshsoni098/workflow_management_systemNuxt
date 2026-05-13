import { userRegisterService } from "~~/server/services/user/user.service";
import { IUser } from "~~/server/types/user.types";
import { registerSchema } from "~~/server/validators/auth.validator";
import { handleError, handleErrorCatch } from "~~/server/utils/errorHandler";

// =========== register user ============

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      return handleError(event, 400, "Provide your credentials");
    }

    const validatedData = registerSchema.parse(body) as IUser;

    const userData = await userRegisterService(validatedData);

     await clearUsersCache();

    return {
      status: true,
      statusCode: 201,
      message: "User registered successfully",
      data: userData.user,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
