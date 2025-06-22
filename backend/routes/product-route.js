// backend/routes/product-routes.js
import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product-controller.js";
import { protectRoute } from "../middleware/auth-middleware.js";
import { authorizeRoles } from "../middleware/authorize-role.js";

const router = express.Router();

// Protect all product routes
router.use(protectRoute);

// Routes
router.post("/", authorizeRoles("admin"), createProduct); // Create new product
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get single product
router.put("/:id", authorizeRoles("admin"), updateProduct); // Update product
router.delete("/:id", authorizeRoles("admin"), deleteProduct); // Delete product

export default router;
