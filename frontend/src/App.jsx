import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
    }, [])
    return (
        <div>
        {/* <Navbar /> */}
        {/* Outlet renders the nested route components here */}
        <Outlet />
        </div>
    );

}

export default App;
