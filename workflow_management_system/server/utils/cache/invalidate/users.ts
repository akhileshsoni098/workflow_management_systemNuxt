import { clearCacheByPattern } from "../helpers";

export const clearUsersCache = async () => {
  await clearCacheByPattern("users:*");
};
