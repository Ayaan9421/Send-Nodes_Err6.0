import { BrowserRouter as Router, Routes, Route, Navigate, createBrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StuVer from "./pages/StuVer";
import LandlordVer from "./pages/LandLordVer" // ✅ Import modal
import Filter from "./pages/Filter";
import SignupPage from "./pages/SignupPage";


function App() {
  

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
