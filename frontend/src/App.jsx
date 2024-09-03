import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HeroSection";
import Navbar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
    {/* <div className="container mt-4"> </div> */}
  </Router>
);

export default App;
