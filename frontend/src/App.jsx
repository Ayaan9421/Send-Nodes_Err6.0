import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StuVer from "./pages/StuVer";
import LandLordVer from "./pages/LandLordVer";

function App() {
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

  return (
    // <Router>
    //   <Routes>
    //     {/* Default Landing Page - Signup */}
    //     <Route path="/" element={<SignupPage />} />
    //     {/* Login Page */}
    //     <Route path="/login" element={<LoginPage />} />
    //     {/* Student Verification Page */}
    //     <Route path="/verify-student" element={<StuVer />} />
    //     {/* Landlord Verification Page */}
    //     <Route path="/verify-landlord" element={<LandLordVer />} />
    //     {/* Redirect Users After Login Based on Role */}
    //     <Route
    //       path="/redirect"
    //       element={
    //         getUserRole() === "Student" ? <Navigate to="/verify-student" /> :
    //         getUserRole() === "Landlord" ? <Navigate to="/verify-landlord" /> :
    //         <Navigate to="/login" />
    //       }
    //     />
    //     {/* Redirect unknown routes to Signup */}
    //     <Route path="*" element={<Navigate to="/" />} />
    //   </Routes>
    // </Router>
    <LandLordVer/>
  );
}

export default App;
