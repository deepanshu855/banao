import "dotenv/config";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Connected to redis successfully");
});

redis.on("error", (err) => {
  console.log(`Redis connection error: ${err}`);
});

export const refreshTTL = async (sandboxId) => {
  await redis.expire(`sandbox:${sandboxId}`, 120);
};
