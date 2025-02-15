import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import * as Jimp from "jimp";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { createProperty, getProperties } from "../controllers/property.controller.js";

const router = express.Router();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, "../uploads/");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes
router.get("/", getProperties); // Fetch all properties
router.post("/", verifyToken, createProperty); // Add new property (Landlords only)

// Upload Images API
router.post("/upload-images", upload.array("images", 15), async (req, res) => {
    try {
        if (!req.files || req.files.length < 2) {
            return res.status(400).json({ message: "At least 2 images are required" });
        }

        const filePaths = req.files.map(file => path.join(__dirname, "../uploads/", file.filename));

        // Create panorama image
        const panoramaPath = path.join(__dirname, "../uploads/output_panorama.jpg");
        await stitchImages(filePaths, panoramaPath);

        return res.status(200).json({ message: "Panorama created successfully", outputPath: `/uploads/output_panorama.jpg` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Image stitching failed" });
    }
});

// Function to stitch images side-by-side
const stitchImages = async (imagePaths, outputPath) => {
    const images = await Promise.all(imagePaths.map(imgPath => Jimp.read(imgPath)));

    const totalWidth = images.reduce((sum, img) => sum + img.bitmap.width, 0);
    const maxHeight = Math.max(...images.map(img => img.bitmap.height));

    const panorama = new Jimp(totalWidth, maxHeight, 0x000000FF);

    let xOffset = 0;
    for (let img of images) {
        panorama.composite(img, xOffset, 0);
        xOffset += img.bitmap.width;
    }

    await panorama.writeAsync(outputPath);
};

export default router;
