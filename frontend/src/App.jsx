import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Filter from "./pages/Filter";
import Chat from "./pages/Chat";
function App() {
  const AppContent = () => {
    const location = useLocation();

    const noNavbarRoutes = ["/", "/login"];

    return (
      <div className="App">
       
        <Chat/>
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
