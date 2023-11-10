import type { SSTConfig } from "sst";
import { Site } from "stacks/SiteStack";
import { StorageStack } from "stacks/StorageStack";
import { ApiStack } from "./stacks/ApiStack";

export default {
  config(_input) {
    return {
      name: "hai-assessment",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(Site);
  },
} satisfies SSTConfig;
