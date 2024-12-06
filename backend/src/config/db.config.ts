import postgres from "postgres";
import { config } from "dotenv";
config();

const { DATABASE_URL } = process.env;

const connectionString =
  DATABASE_URL || "postgresql://manan@localhost:5432/expense-sample";

const options: postgres.Options<{}> = DATABASE_URL
  ? {
      ssl: {
        require: true,
      },
      transform: {
        undefined: null,
      },
    }
  : {
      transform: {
        ...postgres.camel,
        undefined: null,
      },
      
    };

const sql = postgres(connectionString, options);
export default sql;
