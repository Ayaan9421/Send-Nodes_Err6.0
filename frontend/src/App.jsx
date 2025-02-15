import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import StuVer from "./pages/StuVer";
import LandLordVer from "./pages/LandLordVer"
import PropVer from "./pages/PropVer";

function App() {
  const AppContent = () => {
    const location = useLocation();

    const noNavbarRoutes = ["/", "/login"];

    return (
      <div>
        
        <StuVer/>
      </div>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
