import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StuVer from "./pages/StuVer";
import LandlordVer from "./pages/LandLordVer" // ✅ Import modal

function App() {
  const [userRole, setUserRole] = useState(null);
  const [isLandlordModalOpen, setIsLandlordModalOpen] = useState(false);

  useEffect(() => {
    const getUserRole = () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        return decodedToken.role;
      } catch (error) {
        return null;
      }
    };

    const role = getUserRole();
    setUserRole(role);

    // Open the landlord modal automatically if role is "Landlord"
    if (role === "Landlord") {
      setIsLandlordModalOpen(true);
    }
  }, []);

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
