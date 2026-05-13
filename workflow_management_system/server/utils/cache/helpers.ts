import { redis } from "~~/server/config/redis";

export const getCache = async (
  key: string
) => {

  const data =
    await redis.get(key);

  return data
    ? JSON.parse(data)
    : null;
};

export const setCache = async (
  key: string,
  data: unknown,
  ttl = 60
) => {

  await redis.set(
    key,
    JSON.stringify(data),
    "EX",
    ttl
  );
};

export const clearCacheByPattern =
  async (pattern: string) => {

    const keys =
      await redis.keys(pattern);

    if (keys.length) {

      await redis.del(keys);
    }
  };