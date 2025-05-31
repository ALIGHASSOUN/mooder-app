// backend/routes/auth.routes.js
import express from "express";
import { register, login, logout } from "../controllers/auth-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";

const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/logout
router.post("/logout", protectRoute, logout);

export default router;
