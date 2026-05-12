import { allUser } from "~~/server/services/user/user.service";
import { handleErrorCatch } from "../../utils/errorHandler";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const name = query.name as string;

    const allUserData = await allUser(page, limit, name);

    return allUserData;
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);

    console.error(errMessage);

    return handleErrorCatch(500, errMessage);
  }
});
