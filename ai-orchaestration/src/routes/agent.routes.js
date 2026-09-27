import { Router } from "express";
import agent from "../agents/code.agent.js";

const agentRouter = Router();

agentRouter.post("/invoke", async (req, res) => {
  try {
    const { message } = req.body;
    const response = await agent.invoke({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json(response);
  } catch (error) {
    console.error(`Error in invoking agent: ${error.message}`);

    res.status(500).json({
      error: "Failed to invoke agent",
      message: error.message,
    });
  }
});

export default agentRouter;
