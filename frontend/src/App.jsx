import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import StuVer from "./pages/StuVer";
import LandlordVer from "./pages/LandLordVer" // ✅ Import modal
import Filter from "./pages/Filter";
import PropertyDetails from "./components/PropertyMapDetails";
import AccountSettings from "./components/AccountSettings";

import { verifyUser } from "./utils/VerifyUser";

function App() {
    const navigate = useNavigate()
    useEffect(() => {
        const checkAuth = async () => {
          const result = await verifyUser();
          if (result.success) {
            console.log('User is authenticated:', result.user);
            navigate('/student/searchproperty')
          } else {
            console.log('User is not authenticated');
            navigate('/login')
            // Redirect to login page or show an error message
          }
        }
        checkAuth()
    }, []);
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
        <div>
        {/* <Navbar /> */}
        {/* Outlet renders the nested route components here */}
        <Outlet />
        </div>
    );
}

export default App;
