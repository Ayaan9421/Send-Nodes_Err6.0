import express from "express";
import multer from "multer";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createProperty, getProperties, uploadImages } from "../controllers/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();



// Property Routes
router.get("/", getProperties); // Get all properties
router.post("/", verifyToken, createProperty); // Create a new property
router.post("/upload-images", upload.array("images", 10), uploadImages); // Upload images

export default router;