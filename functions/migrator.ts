import { migrate } from "@/drizzle";
import { ApiHandler } from "sst/node/api";
export const handler = ApiHandler(async () => {
  const pathToMigrations = process.env.IS_LOCAL
    ? "drizzle/migrations"
    : "migrations";

  await migrate(pathToMigrations);

  return {
    body: "Migrated!",
  };
});
