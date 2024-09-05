import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FaqSupportPage from "./components/FaqSupportPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import LoginRegisterPage from "./components/LoginRegisterPage";
import AddProperty from "./components/AddProperties";
import ProfilePage from "./components/ProfilePage";
import "./index.css";
import HomePage from "./components/HomePage";

const App = () => (
  <div className="content-wrapper">
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq-support" element={<FaqSupportPage />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/properties" element={<AddProperty />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>

      <Footer />
    </Router>
  </div>
);

export default App;
