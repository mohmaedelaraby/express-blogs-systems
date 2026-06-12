import { Request, Response, NextFunction } from "express";
import { verifyActiveToken } from "../../modules/users/utils/jwt";
import AppError from "../errors/app-error";

const PUBLIC_PATHS = ["/users/register", "/users/login"];

export function globalVerifyToken(req: Request, res: Response, next: NextFunction) {
  if (PUBLIC_PATHS.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return next(new AppError("Unauthorized: No token provided", 401));
  }

  const decoded = verifyActiveToken(token);
  if (!decoded) {
    return next(new AppError("Unauthorized: Invalid or expired token", 401));
  }

  (req as Request & { user: typeof decoded }).user = decoded;
  next();
}
