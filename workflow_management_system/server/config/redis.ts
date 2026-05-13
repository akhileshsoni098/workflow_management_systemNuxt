import Redis from "ioredis";

declare global {
  var redis: Redis | undefined;
}

export const redis =
  globalThis.redis ||
  new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.redis = redis;
}

redis.on("connect", () => {
  console.log("Redis Connected");
});

redis.on("error", (err) => {
  console.log(
    "Redis Error:",
    err.message
  );
});