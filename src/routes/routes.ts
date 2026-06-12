import { Router, Request, Response } from "express";
import userRoutes from "../modules/users/users";
import blogRoutes from "../modules/blogs/blogs";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("Express + TypeScript API is running");
});

router.use("/users", userRoutes);
router.use("/blogs", blogRoutes);

export default router;
