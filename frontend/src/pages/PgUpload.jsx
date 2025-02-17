import React, { useState } from "react";

const PGUpload = () => {
  const [formData, setFormData] = useState({
    address: "",
    rent: "",
    capacity: "",
    amenities: "",
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });

    // Generate previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Uploaded Data:", formData);
    alert("PG details submitted successfully!");
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Upload PG Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="amenities"
            placeholder="Amenities (comma-separated)"
            className="bg-white text-black w-full border-2 p-3 rounded-lg focus:border-blue-500"
            value={formData.amenities}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rent"
            placeholder="Monthly Rent (₹)"
            className="bg-white text-black w-full border-2 p-3 rounded-lg focus:border-blue-500"
            value={formData.rent}
            onChange={handleChange}
            required
          />
        </div>

        <textarea
          name="address"
          placeholder="PG Address"
          className="bg-white  text-black  w-full border-2 p-3 rounded-lg focus:border-blue-500"
          value={formData.address}
          onChange={handleChange}
          required
        ></textarea>

        <input
          type="number"
          name="capacity"
          placeholder="Capacity (No. of People)"
          className="bg-white text-black  w-full border-2 p-3 rounded-lg focus:border-blue-500"
          value={formData.capacity}
          onChange={handleChange}
          required
        />

        {/* File Upload */}
        <label className="block text-black font-semibold">
          Upload Images:
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className=" bg-white mt-2 w-full border-2 p-3 rounded-lg cursor-pointer focus:border-blue-500"
          />
        </label>

        {/* Image Previews */}
        {imagePreviews.length > 0 && (
          <div className="flex gap-3 flex-wrap mt-4 border p-3 rounded-lg">
            {imagePreviews.map((src, index) => (
              <div key={index} className="relative group">
                <img
                  src={src}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-lg border shadow-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-75 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Upload PG
        </button>
      </form>
    </div>
  );
};

export default PGUpload;
