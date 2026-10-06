import "dotenv/config"
import Redis from "ioredis";
import { deleteService } from "../kubernetes/service.js";
import { deletePod } from "../kubernetes/pod.js";

const redis = new Redis(process.env.REDIS_URL); // This instance is used to write on redis

const subscriber = new Redis(process.env.REDIS_URL); // This instance is used to fire an event from redis

export const createSandboxkey = async (sandboxId) => {
  await redis.set(
    `sandbox:${sandboxId}`,
    JSON.stringify({
      status: "active",
    }),
    "EX",
    120,
  );
};

subscriber.config("SET", "notify-keyspace-events", "EX");
subscriber.subscribe("__keyevent@0__:expired");

subscriber.on("message", async (channel, key) => {
  console.log(`Key Expired: ${key}`);

  const sandboxId = key.split(":")[1];
  await deletePod(sandboxId);
  await deleteService(sandboxId);
});

export default subscriber;
