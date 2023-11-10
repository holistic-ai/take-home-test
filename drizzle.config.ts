import type { Config } from "drizzle-kit";

export default {
  schema: "**/*.sql.ts",
  out: "./drizzle/migrations",
  verbose: true,
  driver: "pg",
} satisfies Config;
