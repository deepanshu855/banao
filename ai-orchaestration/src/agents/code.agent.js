import "dotenv/config";
import { createAgent, HumanMessage } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { listFiles, writeFiles, readFiles } from "./tools.js";

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0,
  apiKey: process.env.GROQ_API_KEY,
});

const agent = createAgent({
  model: model,
  tools: [listFiles, writeFiles, readFiles],
});

const result = await agent.invoke(
  {
    messages: [
      {
        role: "user",
        content: "Change the color theme of project from black to white",
      },
    ],
  },
  {
    recursionLimit: 10,
  },
);
