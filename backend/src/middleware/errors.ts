import { ApiError } from "@/utils/errors";
import { HttpStatus } from "@/utils/http-status";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandlerMiddleware = function (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("errorMiddleware", err.message);
  // if (err instanceof ZodError) {
  //   res.status(400).json({
  //     status: "FAILURE",
  //     errors: [...err.errors].map((e) => ({
  //       field: e.path[0],
  //       message: e.message,
  //     })),
  //   });
  //   return;
  // }
  // if (err instanceof ApiError) {
  //   //console.log(err.httpStatus);
  //   res.status(err.httpStatus).json({
  //     status: "FAILURE",
  //     errors: [err.message],
  //     data: null,
  //   });
  //   return;
  // }
  //res.err = err;
  res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .json({ status: "FAILURE", errors: ["Internal Server Error"] });
    return ;
};
