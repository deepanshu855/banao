import { Router } from "express";
import agent from "../agents/code.agent.js";
import { model } from "../agents/code.agent.js";

const agentRouter = Router();

agentRouter.post("/invoke", async (req, res) => {
  try {
    const { message, projectID } = req.body;
    console.log("Invoking agent with message:", message);

    // 1. Set SSE-specific HTTP headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const writer = (text) => res.write(text);

    const response = await agent.stream(
      {
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        context: {
          projectID: projectID,
          writer,
        },
        streamMode: "custom",
      },
    );

    for await (const chunk of response) {
      console.log(chunk);
      res.write(`data: ${chunk}\n\n`);
    }

    res.write(`event: done\ndata: {}\n\n`);

    res.end();
  } catch (error) {
    console.error(`Error in invoking agent: ${error.message}`);

    if (res.headersSent) {
      res.end();
    } else {
      res.status(500).json({
        error: "Failed to invoke agent",
        message: error.message,
      });
    }
  }
});

export default agentRouter;
