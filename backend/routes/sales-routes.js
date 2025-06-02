import express from "express";
import {
  createSale,
  getSales,
  getBranchSales,
} from "../controllers/sales-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", createSale);

router.get("/", getSales);

router.get("/my", getBranchSales);

export default router;
