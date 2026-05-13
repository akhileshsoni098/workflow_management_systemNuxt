import { clearCacheByPattern }
from "../helpers";

export const clearTaskCache =
  async (projectId: string) => {

    await clearCacheByPattern(
      `tasks:${projectId}:*`
    );
};