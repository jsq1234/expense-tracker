import { NextFunction, Request, Response } from "express";

export const catchAllMiddleware = function(req: Request, res: Response, _next: NextFunction){
    res.status(404).json({
        status: 'FAILURE',
        errors: ['Not Found'],
        message: `Cannot ${req.method} ${req.path}`,
    });
}