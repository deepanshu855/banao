import axios from "axios";
import { tool } from "langchain";
import * as z from "zod";

export const listFiles = tool(
  async ({}) => {
    console.log("--------------------------");
    console.log("Calling listFiles tool");
    console.log("--------------------------");

    const response = await axios.get(
      "http://01a0ce04-f87c-77a9-a68b-8c65d596f472.agent.localhost/list-files",
    );

    console.log("--------------------------");
    console.log("Response from listFiles tool" + response.data.files);
    console.log("--------------------------");

    return JSON.stringify(response.data.files);
  },
  {
    name: "list_files",
    description: `List the files and directories available in the current project workspace.Use this tool ONLY when you need to discover the project structure or locate files relevant to the user's request. Call this tool once at the beginning of a task when the required file paths are unknown. After receiving the file list, use read_files to inspect the contents of relevant files. Do NOT call list_files again unless you specifically need
    to refresh the project structure because files have been created, deleted, or renamed. Do not use this tool to read file contents. Do not repeatedly call this tool to verify the same file list.
`,
    schema: z.object({}),
  },
);

export const readFiles = tool(
  async ({ files: [] }) => {
    console.log("--------------------------");
    console.log("Calling readFiles tool");
    console.log("--------------------------");

    const response = await axios.get(
      "http://01a0ce04-f87c-77a9-a68b-8c65d596f472.agent.localhost/read-files?files=" +
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
    Read the contents of one or more files in the project workspace.

    Use this tool AFTER list_files when you need to inspect the implementation
    of files relevant to the user's request.

    The file paths must come from list_files or from files that were created
    during the current task.

    Only read files that are relevant to the task. Do not read the entire
    project unnecessarily.

    If you already have the contents of a file from an earlier tool call,
    do not read the same file again unless the file may have changed.

    Do NOT use this tool to list files. Use list_files for discovering files.
    `,
    schema: z.object({
      files: z
        .array(z.string())
        .describe(
          "The list of files absolute paths to read. These should be files that were listed using the list_files tool or created later",
        ),
    }),
  },
);

export const writeFiles = tool(
  async ({ files }) => {
    console.log("--------------------------");
    console.log("Calling writeFiles tool");
    console.log("--------------------------");

    const response = await axios.patch(
      "http://01a0ce04-f87c-77a9-a68b-8c65d596f472.agent.localhost/update-files",
    );

    console.log("--------------------------");
    console.log("Response from writeFiles tool" + response.data.results);
    console.log("--------------------------");

    return JSON.stringify(response.data.results);
  },
  {
    name: "update_files",
    description: `
      Update or create files in the project workspace.

      Use this tool ONLY after you have inspected the relevant files and determined
      the exact changes required by the user's request.

      Each file must contain its absolute path and its complete new content.

      For an existing file:
      1. Read the file using read_files.
      2. Understand the existing implementation.
      3. Modify the relevant parts while preserving unrelated functionality.
      4. Send the complete updated file content to update_files.

      For a new file:
      - Provide the absolute path and complete content for the new file.

      Do NOT use this tool merely to inspect files.
      Do NOT call this tool before understanding the relevant file contents.
      Do NOT overwrite unrelated files.
      Do NOT repeatedly update the same file unless a previous change needs to
      be corrected.

      After successfully updating files, do not call list_files again unless you
      need to verify that a new file was created or the project structure changed.
      `,
    schema: z.object({
      files: z
        .array(
          z.object({
            file: z
              .string()
              .describe("The absolute path of the file to update"),
            content: z
              .string()
              .describe(
                "The new content for the file, the content should support json format.",
              ),
          }),
        )
        .describe("The list of files to update and their new contents"),
    }),
  },
);
