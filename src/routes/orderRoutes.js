import express from "express";
import orderController from "../controllers/orderController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// place order (user must be logged in)
router.post("/place", authenticate, orderController.place);

export default router;
