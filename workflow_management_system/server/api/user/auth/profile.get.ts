import { IUser } from "~~/server/types/user.types";
import { handleError, handleErrorCatch } from "../../../utils/errorHandler";

//======================  profile =====

export default defineEventHandler(async (event) => {
  try {
    const user = event.context.user as IUser;

    if (!user) {
      return handleError(event, 404, "user not found");
    }

    return {
      status: true,
      statusCode: 200,
      message: "Profile fetched successfully",
      data: user,
    };
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
