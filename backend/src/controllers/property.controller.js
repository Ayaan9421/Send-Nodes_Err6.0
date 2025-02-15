import fs from "fs-extra";
import path from "path";
import * as tf from "@tensorflow/tfjs"; // JavaScript version (no native bindings)
import mobilenet from "@tensorflow-models/mobilenet";
import Property from "../models/property.model.js";
import { createCanvas, loadImage } from "canvas";

// Load MobileNet Model
let model;
const loadModel = async () => {
    if (!model) {
        model = await mobilenet.load();
    }
};

const validKeywords = [
    "room", "indoor", "building", "house", "apartment", "architecture",
    "real estate", "living room", "bedroom", "kitchen", "office", "refrigerator","printer"
];

export const isPropertyImage = async (imagePath) => {
    await loadModel();
    try {
        const img = await loadImage(imagePath);
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        const inputTensor = tf.browser.fromPixels(canvas).expandDims(0);
        const predictions = await model.classify(inputTensor);

        console.log("Predictions for", imagePath, ":", predictions);

        const topPrediction = predictions[0];
        return validKeywords.some((keyword) =>
            topPrediction.className.toLowerCase().includes(keyword)
        );
    } catch (error) {
        console.error("Error verifying image:", error);
        return false;
    }
};


// Upload images
export const uploadImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No images uploaded." });
        }

        const filePaths = req.files.map(file => path.join("uploads/", file.filename));

        // Validate images
        for (const filePath of filePaths) {
            const isValid = await isPropertyImage(filePath);
            if (!isValid) {
                fs.unlinkSync(filePath); // Delete invalid images
                return res.status(400).json({ message: "Invalid image detected. Only property images are allowed!" });
            }
        }

        // ✅ Ensure `owner` is a valid ObjectId
        if (!req.user || !mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        // ✅ Provide required fields with default values or remove the requirement
        const property = new Property({
            images: filePaths,
            owner: new mongoose.Types.ObjectId(req.user.id), // Convert to ObjectId
            rent: req.body.rent || 0, // Provide a default rent value
            location: {
                longitude: req.body.longitude || 0, // Default values to prevent validation errors
                latitude: req.body.latitude || 0
            },
            address: req.body.address || "No address provided",
            name: req.body.name || "Unnamed Property"
        });

        await property.save();

        res.status(201).json({ message: "Images uploaded successfully!", property });
    } catch (error) {
        console.error("Error processing images:", error);
        res.status(500).json({ message: "Error processing images" });
    }
};

// Get all properties
export const getProperties = async (req, res) => {
    try {
        const properties = await Property.find().populate("owner", "name email");
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

// Create new property
export const createProperty = async (req, res) => {
    try {
        const property = new Property({ ...req.body, owner: req.user.id });
        await property.save();
        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};