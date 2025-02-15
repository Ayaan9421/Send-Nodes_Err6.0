import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StuVer from "./pages/StuVer";
import LandlordVer from "./pages/LandLordVer" // ✅ Import modal
import Filter from "./pages/Filter";
import PropertyDetails from "./components/PropertyMapDetails";
import AccountSettings from "./components/AccountSettings";


function App() {
  const sampleProperty = {
    name: "Sunshine PG",
    address: "123 MG Road, Bangalore, Karnataka",
    location: {
      latitude: 12.9716,  // Bangalore Latitude
      longitude: 77.5946, // Bangalore Longitude
    },
    rent: 15000,
    amenities: ["WiFi", "AC", "24/7 Water", "Gym"],
    photos: ["https://via.placeholder.com/300"], // Dummy Image URL
  };

  return (
    <Router>
      <Routes>
        {/* Default Landing Page - Signup */}
        <Route path="/" element={<SignupPage />} />
        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Student Verification Page */}
        <Route path="/verify-student" element={userRole === "Student" ? <StuVer /> : <Navigate to="/login" />} />
        {/* Redirect Users After Login Based on Role */}
        <Route
          path="/redirect"
          element={
            userRole === "Student" ? <Navigate to="/verify-student" /> :
            userRole === "Landlord" ? <Navigate to="/" /> : // ✅ Redirects to Home and Opens Modal
            <Navigate to="/login" />
          }
        />
        {/* Redirect unknown routes to Signup */}
        <Route path="*" element={<Navigate to="/" />} /> 
      </Routes>

      {/* Landlord Verification Modal (Only renders if role is Landlord) */}
      {isLandlordModalOpen && <LandlordVer onClose={() => setIsLandlordModalOpen(false)} />}
    </Router>
  );
}

export default App;
