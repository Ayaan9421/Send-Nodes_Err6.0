import cloudinary from 'cloudinary';
import fs from 'fs';
import { promisify } from 'util';
import { Landlord } from '../models/landlord.model.js';
import { Student } from '../models/student.model.js';
import dotenv from "dotenv";
import User from '../models/user.model.js'; // ✅ Import the User model
import jwt from "jsonwebtoken";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const unlinkAsync = promisify(fs.unlink);

/**
 * Verifies a student and saves their information.
 */
const verifyStudent = async (req, res) => {
  try {
    console.log("Received student verification request.");

    // Ensure user is logged in
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    const { collegeName } = req.body; // ✅ Only extracting `collegeName`
    
    if (!collegeName) {
      return res.status(400).json({ error: "College Name is required." });
    }

    if (!req.files || !req.files.studentId) {
      return res.status(400).json({ error: "College ID Proof is required." });
    }

    console.log("Form Data Received:", req.body);
    console.log("Uploaded Files:", req.files);

    const collegeIdPath = req.files.studentId[0].path;

    // Upload student ID to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(collegeIdPath, { folder: 'student_ids' });

    // Delete local file
    await unlinkAsync(collegeIdPath);

    // Save student data with logged-in user ID and fetched details
    const student = new Student({
      userId: req.user._id,  // ✅ Use the logged-in user's ID
      collegeName,
      collegeIdProofUrl: uploadResponse.secure_url,
    });

    await student.save();

    res.status(201).json({ message: "Student verification successful!", student });

  } catch (error) {
    console.error("Error verifying student:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

/**
 * Verifies a landlord and saves their information.
 */
const verifyLandlord = async (req, res) => {
  try {
    const { name, address } = req.body;

    if (!name || !address) {
      return res.status(400).json({ error: 'Name and address are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'Government ID proof is required.' });
    }

    const governmentIdPath = req.file.path;

    // Upload government ID proof to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(governmentIdPath, {
      folder: 'landlord_ids',
    });

    // Delete local file after successful upload
    await unlinkAsync(governmentIdPath);

    // Save landlord record
    const landlord = new Landlord({
      name,
      address,
      governmentIdUrl: uploadResponse.secure_url,
      verified: true,
    });

    await landlord.save();

    res.status(201).json({
      message: 'Landlord verified successfully!',
      landlord,
    });

  } catch (error) {
    console.error('Error verifying landlord:', error);
    res.status(500).json({ error: 'Failed to verify landlord' });
  }
};

export const checkLandlordVerification = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    // Decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const landlord = await Landlord.findOne({ userId: decoded.userId });

    if (!landlord) {
      return res.status(404).json({ error: "Landlord not found" });
    }

    res.status(200).json({ verified: landlord.verified });
  } catch (error) {
    console.error("Error checking landlord verification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};



export { verifyLandlord, verifyStudent };
