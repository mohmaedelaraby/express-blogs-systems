import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";
import logger from "../logger/logger";
import AppError from "./app-error";

function mapPrismaError(err: Prisma.PrismaClientKnownRequestError): AppError {
    switch (err.code) {
        case "P2002": {
            const target = (err.meta?.target as string[] | undefined)?.join(", ") ?? "field";
            return new AppError(`A record with this ${target} already exists`, 409);
        }
        case "P2025":
            return new AppError("Record not found", 404);
        default:
            return new AppError("Database request failed", 400);
    }
}

export function errorHandler(err: Error, req?: Request, res?: Response, _next?: NextFunction) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        err = mapPrismaError(err);
    }

    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError && err.isOperational ? err.message : "Internal Server Error";

    logger.error(err.message, {
        stack: err.stack,
        path: req?.path,
        method: req?.method,
    });

    console.error("message", err.message );
    res?.status(statusCode).json({
        success: false,
        message,
    });
}
