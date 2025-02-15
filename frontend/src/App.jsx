import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const AppContent = () => {
    const location = useLocation();

    const noNavbarRoutes = ["/", "/login"];

    return (
      <div className="App p-2 bg-slate-900">
        <Navbar/>
        <Home/>
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
