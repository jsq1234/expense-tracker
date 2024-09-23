import express from "express";
import morgan from "morgan";
import { serverLog } from "./logger.config";

const app = express();

app.use(
  morgan(":remote-addr :method :status :response-time", {
    stream: { write: (message) => serverLog.info(message.trim()) },
  })
);

export default app;
