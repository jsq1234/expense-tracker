import postgres from "postgres";
import { config } from "dotenv";
config();

const { DATABASE_URL } = process.env;

const connectionString =
  DATABASE_URL || "postgresql://manan@localhost:5432/expense-tracker-db";

const options: postgres.Options<{}> = DATABASE_URL
  ? {
      ssl: {
        require: true,
      },
    }
  : {};

export const sql = postgres(connectionString, options);
