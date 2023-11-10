import type { StackContext } from "sst/constructs";
import { RemixSite, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function Site({ stack, app }: StackContext) {
  const { database, bucket } = use(StorageStack);

  const site = new RemixSite(stack, "site", {
    bind: [database, bucket],
  });
  stack.addOutputs({
    url: site.url,
  });
}
