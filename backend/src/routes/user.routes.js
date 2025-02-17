import express from "express";
import { verifyToken } from "../middlewares/auth.middleware.js";
import User from "../models/user.model.js";
import { Student } from "../models/student.model.js";
import { Landlord } from "../models/landlord.model.js";

const router = express.Router();

// Fetch logged-in user details
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) return res.status(404).json({ message: "User not found" });

    let userData = { ...user.toObject() };

    if (user.role === "Student") {
      userData.student = await Student.findOne({ userId: user._id });
    } else if (user.role === "Landlord") {
      userData.landlord = await Landlord.findOne({ userId: user._id });
    }

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
