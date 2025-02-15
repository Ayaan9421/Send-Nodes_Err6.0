import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LandlordVer.css";

const LandlordVer = ({ onClose }) => {
  const [governmentId, setGovernmentId] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [shouldShowModal, setShouldShowModal] = useState(false);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/verify/landlord-status", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.verified) {
          setShouldShowModal(false); // ✅ Don't show modal if already verified
        } else {
          setShouldShowModal(true); // ❌ Show modal if not verified
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
        setShouldShowModal(false);
      }
    };

    checkVerificationStatus();
  }, []);

  const handleFileChange = (e) => {
    setGovernmentId(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!governmentId) {
      alert("Please upload your government-issued ID.");
      return;
    }

    setIsVerifying(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("governmentId", governmentId);

      await axios.post("http://localhost:5000/api/verify/landlord", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsVerifying(false);
      setIsVerified(true);

      // ✅ Update DB & localStorage to prevent modal from showing again
      localStorage.setItem("verified", "true");

      // Close modal after verification success message
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Verification failed. Please try again.");
      setIsVerifying(false);
    }
  };

  if (!shouldShowModal) return null; // ✅ Don't render modal if already verified

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Landlord Verification</h2>

        {isVerifying ? (
          <p className="verifying-text">Verifying...</p>
        ) : isVerified ? (
          <p className="verified-text">✅ You are verified!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload Government-Issued ID</label>
              <input type="file" name="governmentId" onChange={handleFileChange} required />
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LandlordVer;
