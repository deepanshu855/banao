import axios from "axios";
import { tool } from "langchain";
import * as z from "zod";

// LIST FILES
export const listFiles = tool(
  async ({}, config) => {
    const writer = config.writer;
    writer(`Listing files in project directory...\n`);

    const response = await axios.get(
      `http://sandbox-service-${config.context.projectID}:3000/list-files`,
    );

    writer(`Files listed successfully. ${JSON.stringify(response.data.files)}`);

    return JSON.stringify(response.data.files);
  },
  {
    name: "list_files",

    description: `
List all files and directories in the project workspace.

Use this to discover the project structure when you don't know which files exist.

Rules:
- Call it at most once per task, and only if file paths are unknown.
- Never call it again after you have the list.
- It returns paths only. Use read_files to see contents.
- It cannot modify files.

Returned paths are project-relative (e.g. src/App.jsx).
`,

    schema: z.object({}),
  },
);

// READ FILES
export const readFiles = tool(
  async ({ files }, config) => {
    const writer = config.writer;
    writer(`Reading files in project directory... ${files.join(", ")}\n`);

    const response = await axios.get(
      `http://sandbox-service-${config.context.projectID}:3000/read-files?files=${files.join(",")}`,
    );

    writer(`Files read successfully. ${JSON.stringify(response.data)}`);

    return JSON.stringify(response.data);
  },
  {
    name: "read_files",

    description: `
Read the contents of one or more existing project files.

Use this to understand existing code before modifying it, including the
imports, exports and component names you need to stay consistent with.

Rules:
- Read only files directly relevant to the request.
- Put all files you need into ONE call. Avoid one call per file.
- Do not re-read a file you already read unless you changed it since.
- Do not read the whole project, lock files, or node_modules.
- Only request paths that exist. If unsure, use list_files first.
- It cannot discover or modify files.

Paths must be project-relative.
Examples: src/App.jsx, src/index.css, src/components/Navbar.jsx
`,

    schema: z.object({
      files: z
        .array(z.string())
        .min(1)
        .describe(
          "Project-relative paths of the files to read. Batch related files into one call.",
        ),
    }),
  },
);

// UPDATE / CREATE FILES
export const updateFiles = tool(
  async ({ updates }, config) => {
    const writer = config.writer;
    writer(`Updating files... ${JSON.stringify(updates)}\n`);

    const response = await axios.patch(
      `http://sandbox-service-${config.context.projectID}:3000/update-files`,
      {
        updates,
      },
    );

    writer(`Files updated successfully. ${JSON.stringify(response.data.results)}`);

    return JSON.stringify(response.data.results);
  },
  {
    name: "update_files",

    description: `
Create new files or overwrite existing files in the project workspace.
This is the ONLY tool that changes files.

Workflow:
1. Use list_files only if the structure is unknown.
2. Use read_files on the files you will change.
3. Make the smallest change that fully satisfies the request.
4. Apply all required changes in one update_files call.

Rules:
- "content" must be the COMPLETE final content of the file, not a snippet,
  diff or placeholder. Never write comments like "// rest of the code here",
  because that deletes the real code.
- When editing an existing file, keep all existing code that is unrelated to
  the request, including its imports, exports and styling.
- Every import must resolve: import only files you created or that exist, and
  packages already used in the project. Do not add new dependencies.
- If a file you create is used elsewhere, update the importing file in the
  same call so the app still builds.
- Batch related changes into one call, but if the total content would be very
  large, split it across calls and keep each file small and focused.
- Prefer editing existing files over creating new ones. Create new files only
  when genuinely needed (for example a separate component for clear reuse).
- Do not touch unrelated files. Do not over-engineer simple requests.
- Do not call this tool again unless a real correction is needed.

Paths are project-relative. Each update has:
- file: project-relative path
- content: complete new file content

Example:
{
  updates: [
    { file: "src/App.jsx", content: "..." },
    { file: "src/components/Navbar.jsx", content: "..." }
  ]
}

Write "content" as a normal string. Do not manually escape quotes or newlines;
the tool system handles serialization. Always provide valid arguments.
`,

    schema: z.object({
      updates: z
        .array(
          z.object({
            file: z
              .string()
              .describe(
                "Project-relative path of the file to create or modify.",
              ),

            content: z.string().describe("Complete new content of the file."),
          }),
        )
        .min(1),
    }),
  },
);
