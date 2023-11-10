import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { RDSData } from "@aws-sdk/client-rds-data";
import { RDS } from "sst/node/rds";
import { migrate as mig } from "drizzle-orm/aws-data-api/pg/migrator";
import * as schema from "@/models/project/project.sql";

export const db = drizzle(new RDSData({}), {
  database: RDS.Database.defaultDatabaseName,
  secretArn: RDS.Database.secretArn,
  resourceArn: RDS.Database.clusterArn,
  schema,
});

export const migrate = async (path: string) => {
  return mig(db, { migrationsFolder: path });
};

export * as SQL from "./index";
