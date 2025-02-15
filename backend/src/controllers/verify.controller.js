import cloudinary from 'cloudinary'
import fs from 'fs'
import { Landlord } from '../models/landlord.model.js';
import { Student } from '../models/student.model.js';
import dotenv from "dotenv";
dotenv.config()
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const verifyStudent = async (req, res) => {
  try {
    const { name, collegeName } = req.body;
    const collegeId = req.file;

    if (!name || !collegeName || !collegeId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Upload collegeId to Cloudinary
    const collegeIdUrl = await cloudinary.uploader.upload(collegeId.path, {
      folder: 'student_ids',
    });

    // Delete the temporary file
    fs.unlinkSync(collegeId.path);

    // Create a new Student document
    const student = new Student({
      name,
      collegeName,
      collegeIdUrl: collegeIdUrl.secure_url,
      verified: true, // Mark as verified
    });

    // Save the student to the database
    await student.save();

    res.status(201).json({
      message: 'Student verified and created successfully',
      student,
    });
  } catch (error) {
    console.error('Error verifying student:', error);
    res.status(500).json({ error: 'Failed to verify student' });
  }
};


const verifyLandlord = async (req, res) => {
  try {
    const { name, address } = req.body;
    const governmentId = req.file;

    if (!name || !address || !governmentId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Upload governmentId to Cloudinary
    const governmentIdUrl = await cloudinary.uploader.upload(governmentId.path, {
      folder: 'landlord_ids',
    });

    // Delete the temporary file
    fs.unlinkSync(governmentId.path);

    // Create a new Landlord document
    const landlord = new Landlord({
      name,
      address,
      governmentIdUrl: governmentIdUrl.secure_url,
      verified: true, // Mark as verified
    });

    // Save the landlord to the database
    await landlord.save();

    res.status(201).json({
      message: 'Landlord verified and created successfully',
      landlord,
    });
  } catch (error) {
    console.error('Error verifying landlord:', error);
    res.status(500).json({ error: 'Failed to verify landlord' });
  }
};

export { verifyLandlord, verifyStudent}