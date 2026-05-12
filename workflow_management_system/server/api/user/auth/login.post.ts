import { userLoginService } from "~~/server/services/user/user.service";
import { IUser } from "~~/server/types/user.types";
import { handleErrorCatch, handleError } from "~~/server/utils/errorHandler";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      return handleError(event, 400, "Provide your credentials");
    }

    const { email, password } = body as IUser;

    if (!email || !password) {
      return handleError(event, 400, "Email or Password is missing");
    }

    const token = (await userLoginService(email, password)) as
      | {
          status: false;
          message: string;
        }
      | {
          status: true;
          token: string;
        };

    if (!token.status) {
      return handleError(event, 400, token.message);
    }

    return {
      status: true,
      statusCode: 201,
      message: "User logged in successfully",
      token: token.token,
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);

    console.log(errMessage);

    return handleErrorCatch(500, errMessage);
  }
});
