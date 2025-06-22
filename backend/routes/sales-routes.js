import express from "express";
import {
  createSale,
  getSales,
  getBranchSales,
} from "../controllers/sales-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";
import { authorizeRoles } from "../middleware/authorize-role.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", authorizeRoles("branch"), createSale);

router.get("/", getSales);

router.get("/my", getBranchSales);

export default router;
