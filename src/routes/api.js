import { Router } from "express";
import {
  authenticateUser,
  createUserAccount,
  getAuthenticatedUser,
} from "../app/controllers/auth.controller.js";
import authMiddleware from "../app/middleware/auth.middleware.js";
const router = Router();

router.post("/register", createUserAccount);
router.post("/login", authenticateUser);
router.get("/user", authMiddleware, getAuthenticatedUser);

export const authRouter = router;
