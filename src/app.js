import express from "express";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check route (optional)
app.get("/", (req, res) => {
  res.json({ message: "Ecommerce API is running..." });
});

export default app;
