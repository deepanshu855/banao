import "dotenv/config";
import { createAgent, modelFallbackMiddleware } from "langchain";
import { listFiles, readFiles, updateFiles } from "./tools.js";
import { ChatGroq } from "@langchain/groq";
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

// Primary model: retries a few times to ride out short TPM waits (~2s)
const groqPrimary = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0.1,
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 3,
});

// Fallback 1: Groq's newer Qwen model
const groqQwen = new ChatGroq({
  model: "qwen/qwen3.8-27b",
  temperature: 0.1,
  apiKey: process.env.GROQ_API_KEY,
  maxRetries: 0,
});

// Fallback 2: Gemini (works when quota is available)
const gemini = process.env.GEMINI_API_KEY
  ? new ChatGoogleGenerativeAI({
      model: "gemini-3.5-flash",
      temperature: 0.1,
      apiKey: process.env.GEMINI_API_KEY,
      maxRetries: 0,
    })
  : null;

// Fallback 3: OpenRouter free router (picks a free model that supports tool calling)
const openrouter = process.env.OPENROUTER_API_KEY
  ? new ChatOpenAI({
      model: "openrouter/free",
      temperature: 0.1,
      apiKey: process.env.OPENROUTER_API_KEY,
      configuration: { baseURL: "https://openrouter.ai/api/v1" },
      maxRetries: 0,
    })
  : null;

const fallbacks = [groqQwen, gemini, openrouter].filter(Boolean);

export const model = groqPrimary;

const agent = createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles],
  middleware: [modelFallbackMiddleware(...fallbacks)],
}).withConfig({
  recursionLimit: 20,
});

export default agent;
