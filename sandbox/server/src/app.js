import express from "express";
import morgan from "morgan";
import { createPod } from "./kubernetes/pod.js";
import { createService } from "./kubernetes/service.js";
import { v7 as uuid } from "uuid";
import { k8sCoreV1Api } from "./kubernetes/config.js";
import { createSandboxkey } from "./configs/redis.js";

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(express.json());

const waitForPodReady = async (sandboxId, timeoutMs = 60000) => {
  const startTime = Date.now();
  const podName = `sandbox-pod-${sandboxId}`;

  while (Date.now() - startTime < timeoutMs) {
    try {
      const response = await k8sCoreV1Api.readNamespacedPod({
        name: podName,
        namespace: "default",
      });

      const pod = response; // client-node return might just be response directly depending on version, wait, let's check
      // k8s node client usually returns { body, response } in older versions, but let's be safe.
      const body = pod.body || pod; // Handle both cases just in case

      const isReady = body.status?.conditions?.some(
        (condition) =>
          condition.type === "Ready" && condition.status === "True",
      );

      if (isReady) {
        return true;
      }
    } catch (error) {
      console.log(`Waiting for pod ${podName} to be created...`);
    }

    // Wait 2 seconds before polling again
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  throw new Error(`Pod ${podName} did not become ready within ${timeoutMs}ms`);
};

// Routes
app.get("/api/sandbox/health", (req, res) => {
  res
    .status(200)
    .json({ status: "ok", message: "Sandboxserver is healthy (Updated)" });
});

app.post("/api/sandbox/start", async (req, res) => {
  const sandboxId = uuid();

  try {
    await Promise.all([
      createPod(sandboxId),
      createService(sandboxId),
      createSandboxkey(sandboxId),
    ]);

    // Wait until Kubernetes reports the pod is actually running and ready
    await waitForPodReady(sandboxId);

    res.status(200).json({
      message: "Sandbox environment created successfully",
      sandboxId: sandboxId,
      previewUrl: `http://${sandboxId}.preview.localhost`,
    });
  } catch (error) {
    console.error("Failed to start sandbox:", error);
    res.status(500).json({
      message: "Failed to start sandbox",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.send("Hello from the sandbox server!");
});

export default app;
