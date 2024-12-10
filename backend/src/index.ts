import e from "express";
import { router } from "./controllers/user.controller";
import { ZodError } from "zod";
import { CommonResponse } from "./utils/types";
import { httpLogger, logger } from "./config/logger.config";
import { ApiError } from "./utils/errors";
import { HttpStatus } from "./utils/http-status";
import { authenticationMiddleware } from "./middleware/authentication";
import { errorHandlerMiddleware } from "./middleware/errors";
import { catchAllMiddleware } from "./middleware/catchAll";

const app = e();

app.use(e.json());
app.use(httpLogger);
app.use(authenticationMiddleware);
app.use("/api", router);
app.use(catchAllMiddleware);  
app.use(errorHandlerMiddleware)

app.listen(8080, () => {
  console.log("Listening!");
});