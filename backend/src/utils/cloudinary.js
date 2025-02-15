import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

async function uploadOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;
    // Upload an image
    const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log(uploadResponse);
    fs.unlinkSync(localFilePath);
    return uploadResponse;
  } catch (error) {
    // Remove the locally saved temp file if upload operation failed
    fs.unlinkSync(localFilePath);
    console.log(error);
    return null;
  }
}

export { uploadOnCloudinary };