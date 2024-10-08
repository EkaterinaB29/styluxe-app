import express from "express";
import path from "path";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";

import reviewRoutes from "./routes/reviewRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import orderRoutes from "./routes/ordersRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import db from "./config/db.js";

dotenv.config();
const port = 8211;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: "http://88.200.63.148:3333", // Adjust if needed
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Logging middleware to capture request details
/*app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);
  next();
});*/

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/orders", orderRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Serve the React Frontend
app.use(express.static(path.join(__dirname, "build")));

// Fallback for React Router - Serve index.html for any other route not handled by the above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
