import { allUser } from "~~/server/services/user/user.service";
import { handleErrorCatch } from "../../utils/errorHandler";
import { usersListKey } from "~~/server/utils/cache/keys/users";
import { getCache, setCache } from "~~/server/utils/cache/helpers";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const name = query.name as string;

    const cacheKey = usersListKey({
      page,
      limit,
      name,
    });

    const cached = await getCache(cacheKey);
    if (cached) {
      return cached;
    }
    const allUserData = await allUser(page, limit, name);

    await setCache(cacheKey, allUserData,60);

    return allUserData;
  } catch (err: unknown) {
    if (err instanceof Error) {
      const statusCode = "statusCode" in err ? Number(err.statusCode) : 500;

      return handleErrorCatch(statusCode, err.message);
    }

    return handleErrorCatch(500, "Internal Server Error");
  }
});
