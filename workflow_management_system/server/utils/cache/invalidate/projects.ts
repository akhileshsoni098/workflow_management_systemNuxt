import { clearCacheByPattern }
from "../helpers";

export const clearProjectCache =
  async (projectId: string) => {

    // project details
    await clearCacheByPattern(
      `project:*:${projectId}`
    );

    // project list
    await clearCacheByPattern(
      "projects:*"
    );
};