import "dotenv/config";
import { createAgent, HumanMessage } from "langchain";
import { listFiles, readFiles, updateFiles, createFiles } from "./tools.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  temperature: 0.7,
  apiKey: process.env.GEMINI_API_KEY,
});

const agent = createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles, createFiles],
}).withConfig({
  recursionLimit: 20,
});

export default agent;
