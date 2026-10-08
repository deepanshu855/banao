import { Router } from "express";
import { createPod } from "../kubernetes/pod.js";
import { createService } from "../kubernetes/service.js";
import { createSandboxkey } from "../configs/redis.js";
import { k8sCoreV1Api } from "../kubernetes/config.js";
import { v7 as uuid } from "uuid";
import projectModel from "../models/project.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

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

authRouter.post("/start", authMiddleware, async (req, res) => {
  const projectId = req.body.projectId;

  const project = await projectModel.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

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

authRouter.post("/project", authMiddleware, async (req, res) => {
  const { title } = req.body;

  console.log(title)

  const newProject = await projectModel.create({
    user: req.user.id,
    title,
  });

  res.status(201).json({
    message: "Project created successfully",
    project: newProject,
  });
});

authRouter.get("/projects", authMiddleware, async (req, res) => {
  const projects = await projectModel.find({ userId: req.user.id });

  res.status(200).json({
    message: "Projects retrieved successfully",
    projects,
  });
});

export default authRouter;
