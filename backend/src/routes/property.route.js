import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createProperty, getProperties, uploadImages } from "../controllers/property.controller.js";

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Property Routes
router.get("/", getProperties); // Get all properties
router.post("/", verifyToken, createProperty); // Create a new property
router.post("/upload-images", upload.array("images", 10), uploadImages); // Upload images

export default router;