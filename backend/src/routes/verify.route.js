import express from 'express';
import multer from 'multer';
import path from 'path';
import { verifyStudent, verifyLandlord } from '../controllers/verify.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();



// Route to verify student
router.post('/verify-student', upload.single('collegeId'), verifyStudent);

// Route to verify landlord
router.post('/verify-landlord', upload.single('governmentId'), verifyLandlord);

export default router;