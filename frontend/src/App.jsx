import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HeroSection";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FaqSupportPage from "./components/FaqSupportPage";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginRegisterPage from "./components/LoginRegisterPage";

const App = () => (
  <div className="content-wrapper">
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq-support" element={<FaqSupportPage />} />
          <Route path="/login" element={<LoginRegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;
