import { BrowserRouter as Router, Routes, Route, useLocation, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import StuVer from "./pages/StuVer";
import LandLordVer from "./pages/LandLordVer"
import PropVer from "./pages/PropVer";
import Filter from "./pages/Filter";
import SignupPage from "./pages/SignupPage";


function App() {
  

  return (
    // <Router>
      <SignupPage />
    // </Router>
  );
}

export default App;
