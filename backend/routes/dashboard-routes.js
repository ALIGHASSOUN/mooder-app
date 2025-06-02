// backend/routes/dashboard-routes.js
import express from "express";
import { getDailyReport } from "../controllers/dashboard-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(protectRoute);

// الإدارة فقط
router.get("/daily", getDailyReport);

export default router;
