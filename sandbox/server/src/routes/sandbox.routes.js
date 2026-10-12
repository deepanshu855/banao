import { Router } from "express";
import { createPod } from "../kubernetes/pod.js";
import { createService } from "../kubernetes/service.js";
import { createSandboxkey } from "../configs/redis.js";
import { v7 as uuid } from "uuid";
import projectModel from "../models/project.schema.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/start", authMiddleware, async (req, res) => {
  const projectId = req.body.projectId;

  const project = await projectModel.findById(projectId);

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  const sandboxId = uuid();

  try {
    // Fire-and-forget: schedule the pod, service, and redis key in parallel.
    // We do NOT wait for the pod to become Ready — the frontend polls instead.
    await Promise.all([
      createPod(sandboxId, projectId),
      createService(sandboxId),
      createSandboxkey(sandboxId),
    ]);

    // Respond immediately so the frontend can show the workspace UI
    // while the pod is still initializing in the background.
    res.status(200).json({
      message: "Sandbox environment initializing",
      sandboxId: sandboxId,
      previewUrl: `http://${sandboxId}.preview.localhost`,
    });
  } catch (error) {
    console.error("Failed to schedule sandbox:", error);
    res.status(500).json({
      message: "Failed to start sandbox",
      error: error.message,
    });
  }
});

authRouter.post("/project", authMiddleware, async (req, res) => {
  const { title } = req.body;

  console.log(title);

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
  console.log(req.user.id);

  const projects = await projectModel.find({ user: req.user.id });
  console.log(projects);

  res.status(200).json({
    message: "Projects retrieved successfully",
    projects,
  });
});

export default authRouter;
