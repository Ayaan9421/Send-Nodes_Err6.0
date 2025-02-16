import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyUser } from "./utils/VerifyUser";

function App() {
    
    return (
        <div>
        {/* <Navbar /> */}
        {/* Outlet renders the nested route components here */}
        <Outlet />
        </div>
    );

}

export default App;
