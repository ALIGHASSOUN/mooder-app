// backend/routes/returns-routes.js

import express from "express";
import {
  createReturn,
  getReturns,
  getBranchReturns,
} from "../controllers/returns-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";
import { authorizeRoles } from "../middleware/authorize-role.js";

const router = express.Router();

router.use(protectRoute);

router.post("/", authorizeRoles("branch"), createReturn);

router.get("/", authorizeRoles("admin"), getReturns);

router.get("/my", authorizeRoles("admin"), getBranchReturns);

export default router;
