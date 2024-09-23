import { dbLog, serverLog } from "@/config/logger.config";
import { DatabaseError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";

export function ErrorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {}
