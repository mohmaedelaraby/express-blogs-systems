import { Request, Response, NextFunction } from "express";
import {
  decodeExpiredActiveToken,
  generateToken,
  verifyActiveToken,
  verifyRefreshToken,
} from "../../modules/users/utils/jwt";
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

  let decoded = verifyActiveToken(token);
  if (!decoded) {
    const expiredPayload = decodeExpiredActiveToken(token);
    if (!expiredPayload) {
      return next(new AppError("Unauthorized: Invalid token", 401));
    }

    const refreshToken = req.headers["x-refresh-token"] as string | undefined;
    if (!refreshToken) {
      return next(new AppError("Unauthorized: Token expired, refresh token required", 401));
    }

    const refreshDecoded = verifyRefreshToken(refreshToken);
    if (!refreshDecoded) {
      return next(new AppError("Unauthorized: Invalid or expired refresh token", 401));
    }

    const newAccessToken = generateToken(refreshDecoded);
    res.setHeader("x-access-token", newAccessToken);
    decoded = refreshDecoded;
  }

  (req as Request & { user: typeof decoded }).user = decoded;
  next();
}
