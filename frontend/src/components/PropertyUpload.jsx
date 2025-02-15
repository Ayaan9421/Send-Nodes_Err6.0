import React, { useState } from "react";
import axios from "../lib/axios"; // Use existing axios instance

const PropertyUpload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setImages(event.target.files);
  };

  // Upload images
  const handleUpload = async () => {
    if (images.length === 0) {
      alert("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/properties/upload-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading images:", error);
      setMessage(error.response?.data?.message || "Failed to upload images.");
    } finally {
      setLoading(false);
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
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {loading ? "Uploading..." : "Upload Images"}
      </button>

      {message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
    </div>
  );
};

export default PropertyUpload;