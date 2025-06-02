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

const router = express.Router();

// Protect all product routes
router.use(protectRoute);

// Routes
router.post("/", createProduct); // Create new product
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get single product
router.put("/:id", updateProduct); // Update product
router.delete("/:id", deleteProduct); // Delete product

export default router;
