import type { StackContext } from "sst/constructs";
import { Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

// see https://github.com/drizzle-team/sst-drizzle-example/blob/main/stacks/MyStack.ts
export function ApiStack({ stack }: StackContext) {
  const { database } = use(StorageStack);

  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [database],
        copyFiles: [
          {
            from: "drizzle/migrations",
            to: "migrations",
          },
        ],
      },
    },
    routes: {
      "GET /migrate": "functions/migrator.handler",
    },
  });

  stack.addOutputs({
    apiUrl: api.url,
  });

  return { api };
}
