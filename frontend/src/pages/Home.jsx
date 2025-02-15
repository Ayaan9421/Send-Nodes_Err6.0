import React, { useState } from "react";
import Property3DViewer from "../components/Property3DViewer";
import axios from "../lib/axios"; // Make sure axios is configured

const Home = () => {
    const [modelUrl, setModelUrl] = useState("");

    const handleUpload = async (event) => {
      const formData = new FormData();
      for (const file of event.target.files) {
          formData.append("images", file);
      }
  
      // Debugging: Log FormData content
      for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
      }
  
      try {
          const response = await axios.post(
              "http://localhost:5000/api/properties/upload-images",
              formData,
              {
                  headers: { "Content-Type": "multipart/form-data" },
                  withCredentials: true, // If using cookies/session
              }
          );
  
          console.log("Upload successful:", response.data);
      } catch (error) {
          console.error("Upload failed:", error);
          console.error("Response data:", error.response?.data); // Log backend response
          alert("Failed to upload images.");
      }
  };
  
  

    return (
        <div>
            <h1>Upload Property Images</h1>
            <input type="file" multiple accept="image/*" onChange={handleUpload} />
            {modelUrl && <Property3DViewer modelUrl={modelUrl} />}
        </div>
    );
};

export default Home;
