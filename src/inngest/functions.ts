import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert NextJS Developer.  You write readable and maintainable code. You write simple Next.JS & React snippets",
      model: gemini({ model: "gemini-2.0-flash-lite" }),
    });

    const { output } = await codeAgent.run(
      `Write the code for the following component : ${event.data.value}`
    );
    console.log(output);
    return { output };
  }
);
