import { NextFunction, Request, Response } from "express";
import logger from "../logger/logger";
import AppError from "./app-error";

export function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction) {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError && err.isOperational ? err.message : "Internal Server Error";

    logger.error(err.message, {
        stack: err.stack,
        path: req.path,
        method: req.method,
    });

    res.status(statusCode).json({
        success: false,
        message,
    });
}
