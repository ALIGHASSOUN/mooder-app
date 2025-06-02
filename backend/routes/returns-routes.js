// backend/routes/returns-routes.js

import express from "express";
import {
  createReturn,
  getReturns,
  getBranchReturns,
} from "../controllers/returns-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", createReturn);

router.get("/", getReturns);

router.get("/my", getBranchReturns);

export default router;
