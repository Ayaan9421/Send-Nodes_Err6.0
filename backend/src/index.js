import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import authRoutes from "./routes/auth.route.js";
import propertyRoutes from "./routes/property.route.js";
import rentalAgreementRoutes from "./routes/rentalAgreement.route.js";
import reviewRoutes from "./routes/review.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/rentalAgreement", rentalAgreementRoutes);
app.use("/api/review", reviewRoutes);

// Starting URL
app.get("/", (req, res) => {
    res.json({ message: "Yayyy" });
});

// Socket.io (for chat feature)
io.on("connection", (socket) => {
    console.log("New user connected");
    socket.on("disconnect", () => console.log("User disconnected"));
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Failed:", err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
