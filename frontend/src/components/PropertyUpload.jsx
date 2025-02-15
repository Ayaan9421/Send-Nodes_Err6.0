import React, { useState } from "react";
import axios from "../lib/axios"; // Use existing axios instance

const PropertyUpload = () => {
    const [images, setImages] = useState([]);
    const [panoramaUrl, setPanoramaUrl] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        setImages(event.target.files);
    };

    // Upload images and generate panorama
    const handleUpload = async () => {
        if (images.length < 2) {
            alert("Please select at least 2 images.");
            return;
        }

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i]);
        }

        try {
            // Upload images
            const response = await axios.post("/api/properties/upload-images", formData);
            setPanoramaUrl(`http://localhost:5000${response.data.outputPath}`);
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images. Please try again.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload Property Images</h2>
            <input
                type="file"
                multiple
                accept="image/*"
                className="mb-4"
                onChange={handleFileChange}
            />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Upload & Generate Panorama
            </button>

            {panoramaUrl && (
                <div className="mt-6">
                    <h3 className="text-lg font-medium">Generated Panorama</h3>
                    <img
                        src={panoramaUrl}
                        alt="Panorama"
                        className="w-full max-h-[500px] rounded-lg border"
                    />
                </div>
            )}
        </div>
    );
};

export default PropertyUpload;
