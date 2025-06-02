import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth-routes.js";
import productRoutes from "./routes/product-route.js";
import salesRoutes from "./routes/sales-routes.js";
import returnsRoutes from "./routes/returns-routes.js";
import dashboardRoutes from "./routes/dashboard-routes.js";
import stockRoutes from "./routes/stock-routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/returns", returnsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/stock", stockRoutes);

app.listen(5000, () => {
  console.log("Server is runing on http://localhost:" + PORT);
  connectDB();
});
