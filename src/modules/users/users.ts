import { Router } from "express";
import { registerUser, loginUser, getUserById } from "./controller/users.contoller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

export default router;
