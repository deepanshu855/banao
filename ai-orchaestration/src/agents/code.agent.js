import "dotenv/config";
import { createAgent } from "langchain";
import { ChatCohere } from "@langchain/cohere";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { listFiles, writeFiles, readFiles } from "./tools.js";

const model = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: process.env.COHERE_API_KEY,
  temperature: 0.7,
});

const agent = createAgent({
  model,
  tools: [listFiles, writeFiles, readFiles],
});

await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Change the color theme of project from black to white",
    },
  ],
});
