import { Router, Request, Response } from "express";
import userRoutes from "../modules/users/users";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript API is running");
});

router.use("/users", userRoutes);

export default router;
