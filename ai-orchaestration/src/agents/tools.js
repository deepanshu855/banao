import axios from "axios";
import { tool } from "langchain";
import * as z from "zod";

export const listFiles = tool(
  async () => {
    console.log("--------------------------");
    console.log("Calling listFiles tool");
    console.log("--------------------------");

    const response = await axios.get(
      "http://sandbox-service-01a0fb51-d180-76da-ad05-9ed80fad6a79:3000/list-files",
    );

    console.log("--------------------------");
    console.log("Response from listFiles tool" + response.data.files);
    console.log("--------------------------");

    return JSON.stringify(response.data.files);
  },
  {
    name: "list_files",
    description: `
    List all files and directories available in the current project workspace.

    Use this tool when you need to discover the project structure or locate
    files relevant to the user's request.

    Workflow:
    1. Call this tool once at the beginning of a task when the required file
       paths are unknown.
    2. Use the returned project-relative file paths with read_files to inspect
       relevant files.
    3. Do not call this tool again unless the project structure may have changed
       because files were created, deleted, or renamed.

    This tool only discovers files and directories. It does not read file
    contents and does not modify files.

    Do not repeatedly call this tool to verify the same project structure.
  `,
    schema: z.object({}),
  },
);

export const readFiles = tool(
  async ({ files }) => {
    console.log("--------------------------");
    console.log("Calling readFiles tool");
    console.log("--------------------------");

    const response = await axios.get(
      "http://sandbox-service-01a0fb51-d180-76da-ad05-9ed80fad6a79:3000/read-files?files=" +
        files.join(","),
    );

    console.log("--------------------------");
    console.log("Response from readFiles tool" + response.data);
    console.log("--------------------------");

    return JSON.stringify(response.data);
  },
  {
    name: "read_files",
    description: `
    Read the contents of one or more files in the current project workspace.

    Use this tool after list_files when you need to understand the existing
    implementation before making changes.

    The file paths must be project-relative paths returned by list_files or
    paths of files created during the current task.

    Examples:
    - src/App.jsx
    - src/App.css
    - src/components/Navbar.jsx

    Only read files that are relevant to the user's request. Do not read the
    entire project unnecessarily.

    If you already have the contents of a file from an earlier tool call and
    the file has not changed, do not read it again.

    Do not use this tool to discover files. Use list_files for that.

    Do not modify files with this tool.
  `,
    schema: z.object({
      files: z
        .array(z.string())
        .describe(
          "Project-relative paths of the files to read, such as src/App.jsx or src/App.css",
        ),
    }),
  },
);

export const updateFiles = tool(
  async ({ updates }) => {
    console.log("--------------------------");
    console.log("Calling updateFiles tool");
    console.log("--------------------------");

    const response = await axios.patch(
      "http://sandbox-service-01a0fb51-d180-76da-ad05-9ed80fad6a79:3000/update-files",
      {
        updates,
      },
    );

    console.log("--------------------------");
    console.log("Response from updateFiles tool", response.data.results);
    console.log("--------------------------");

    return JSON.stringify(response.data.results);
  },
  {
    name: "update_files",
    description: `
      Update existing files in the current project workspace.

      Use this tool ONLY when you need to modify files that already exist.

      Before updating an existing file:
      1. Use list_files to discover the project structure if the file path is unknown.
      2. Use read_files to inspect the existing file.
      3. Understand the existing implementation.
      4. Make only the changes required by the user's request.
      5. Provide the complete new content of the file.

      File paths must be project-relative paths, for example:
      - src/App.jsx
      - src/App.css
      - src/components/Navbar.jsx

      Do NOT use this tool to create new files.
      Use create_files when a new file is required.

      Do NOT update unrelated files.
      Do NOT repeatedly update the same file unless a previous change
      needs to be corrected.

      Each update must contain:
      - file: project-relative path
      - content: complete new file content
    `,
    schema: z.object({
      updates: z.array(
        z.object({
          file: z
            .string()
            .describe(
              "Project-relative path of an existing file, such as src/App.jsx",
            ),
          content: z.string().describe("Complete new content of the file"),
        }),
      ),
    }),
  },
);

export const createFiles = tool(
  async ({ files }) => {
    console.log("--------------------------");
    console.log("Calling createFiles tool");
    console.log("--------------------------");

    const response = await axios.post(
      "http://sandbox-service-01a0fb51-d180-76da-ad05-9ed80fad6a79:3000/create-files",
      {
        files,
      },
    );

    console.log("--------------------------");
    console.log("Response from createFiles tool", response.data.results);
    console.log("--------------------------");

    return JSON.stringify(response.data.results);
  },
  {
    name: "create_files",
    description: `
      Create new files in the current project workspace.

      Use this tool ONLY when a new file is required by the user's request.

      Before creating a file:
      1. Use list_files to understand the project structure.
      2. Determine the appropriate project-relative path.
      3. If necessary, use read_files to inspect related files so the new file
         integrates correctly with the existing project.

      File paths must be project-relative paths, for example:
      - src/components/Hero.jsx
      - src/components/Navbar.jsx
      - src/components/Button.jsx

      Do NOT use this tool to modify existing files.
      Use update_files when an existing file needs to be changed.

      Each file must contain:
      - file: project-relative path of the new file
      - content: complete content of the new file

      Do not create unnecessary files.
      Do not create a file if an existing file should be modified instead.
    `,
    schema: z.object({
      files: z.array(
        z.object({
          file: z
            .string()
            .describe(
              "Project-relative path of the new file, such as src/components/Hero.jsx",
            ),
          content: z.string().describe("Complete content of the new file"),
        }),
      ),
    }),
  },
);
