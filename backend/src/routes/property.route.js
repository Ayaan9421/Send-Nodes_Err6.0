import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createProperty, getProperties } from "../controllers/property.controller.js";

const router = express.Router();

router.get("/", getProperties); // Fetch all properties
router.post("/", verifyToken, createProperty); // Add new property (Landlords only)

export default router;
