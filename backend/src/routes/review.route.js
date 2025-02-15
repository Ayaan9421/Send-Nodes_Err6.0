import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createReview, getReviews } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/", getReviews);
router.post("/", verifyToken, createReview);

export default router;
