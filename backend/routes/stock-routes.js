// routes/stock-routes.js
import express from "express";
import { protectRoute } from "../middleware/auth-middleware.js";
import { authorizeRoles } from "../middleware/authorize-role.js";
import {
  upsertStock,
  getBranchStock,
} from "../controllers/stock-controller.js";
import { authorizeRoles } from "../middleware/authorize-role.js";

const router = express.Router();

// تعديل الكمية (للإدارة أو عند المرتجع)
router.post(
  "/update",
  protectRoute,
  authorizeRoles("admin", "branch"),
  upsertStock
);

// الحصول على كمية المنتجات في الفرع
router.get(
  "/my-stock",
  protectRoute,
  authorizeRoles("admin", "branch"),
  getBranchStock
);

export default router;
