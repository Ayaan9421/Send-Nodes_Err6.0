import express from "express";
import { verifyStudent, verifyLandlord,checkLandlordVerification } from "../controllers/verify.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js"; // ✅ Import auth middleware

const router = express.Router();

// Route to verify student
router.post("/student", authMiddleware, upload.fields([{ name: "studentId" }]), verifyStudent);

// Route to verify landlord
router.post("/landlord", upload.single("governmentId"), verifyLandlord);

// ✅ API to check if landlord is already verified
router.get("/landlord-status", checkLandlordVerification);

export default router;
