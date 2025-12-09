import express from "express";
import productController from "../controllers/productController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Admin only route
router.post(
  "/create",
  authenticate,
  authorizeRoles("admin"),
  productController.create
);

// Public route
router.get("/all", productController.getAll);

export default router;
