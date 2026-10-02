import dotenv from "dotenv";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createAgent } from "langchain";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { listFiles, readFiles, createFiles, updateFiles } from "./tools.js";
import dns from "node:dns/promises";

dotenv.config({ path: fileURLToPath(new URL("./.env", import.meta.url)) });

const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  temperature: 0.7,
  apiKey: process.env.GEMINI_API_KEY,
});

const agent = createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles, createFiles],
}).withConfig({
  recursionLimit: 300,
});

function contentToText(content) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return JSON.stringify(content);

  return content
    .map((part) => (typeof part === "string" ? part : part.text || ""))
    .join("");
}

async function listReactProjectDirectories() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error(
        "GEMINI_API_KEY is missing from this file's .env or environment.",
      );
    }

    const result = await agent.invoke({
      messages: [
        {
          role: "user",
          content:
            'Change the theme of the React application to "White". Inspect the relevant files and update the project accordingly.',
        },
      ],
    });

    const toolResults = result.messages.filter(
      (message) => message.type === "tool",
    );
    if (toolResults.length === 0) {
      throw new Error(
        "The agent completed without calling the list_files tool.",
      );
    }

    for (const toolResult of toolResults) {
      console.log(`list_files result:\n${contentToText(toolResult.content)}`);
    }

    const reply = [...result.messages]
      .reverse()
      .find((message) => message.type === "ai");
    if (reply) console.log(`\nAI: ${contentToText(reply.content)}`);
  } catch (error) {
    console.error(`Agent/tool check failed: ${error.message}`);
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  await listReactProjectDirectories();
}

export default agent;
