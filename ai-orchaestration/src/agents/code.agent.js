import "dotenv/config";
import { createAgent, HumanMessage } from "langchain";
import { ChatGroq } from "@langchain/groq";
import { ChatMistralAI } from "@langchain/mistralai";
import { listFiles, writeFiles, readFiles } from "./tools.js";

const model = new ChatMistralAI({
  model: "mistral-medium-latest",
  temperature: 0.7,
  apiKey: process.env.MISTRAL_API_KEY,
});

const agent = createAgent({
  model: model,
  tools: [listFiles, writeFiles, readFiles],
}).withConfig({
  recursionLimit: 300,
});

export default agent;
