import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/NNlogo.png";
import "../styles/navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useLogoutMutation } from "./../slices/userApiSlice";

const NavbarComponent = () => {
  const [logout] = useLogoutMutation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showElements, setShowElements] = useState(false); // State to manage timeout for showing elements

  // Function to check login status from localStorage
  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(loginStatus === "true");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  // Check login status initially and every time localStorage changes
  useEffect(() => {
    checkLoginStatus();

    if (localStorage.getItem("isLoggedIn") === "true") {
      // Delay showing the elements after login
      const timer = setTimeout(() => {
        setShowElements(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowElements(false);
    }

    // Watch for changes in localStorage to update login status dynamically
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [isLoggedIn]);

  const handleSubmit = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("username");
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setShowElements(false); // Hide the elements after logout
      alert("Logged out.");
      console.log("You have been logged out!");
    } catch (err) {
      console.error("Failed to Logout:", err);
      alert("Failed to Logout.");
    }
  };

  return (
    <Navbar expand="lg" fixed="top" className="navbar-transparent">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="text-white">
          <img
            src={logo}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top color"
          />
          &nbsp; NextNest
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-nav"
          className="bg-white"
          id="hamburger"
        />
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/addproperties">
              Add Property
            </Nav.Link>
          </Nav>

          <Nav>
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">
                Login/Register
              </Nav.Link>
            )}
          </Nav>

          {isLoggedIn &&
            showElements && ( // Only show elements after 2 seconds
              <>
                <div
                  className="d-flex align-items-center"
                  style={{ fontFamily: '"Montserrat", sans-serif' }}
                >
                  <h5
                    className="text-white mb-0 me-2"
                    style={{
                      fontFamily: '"Montserrat",sans-serif',
                    }}
                  >
                    Hi, {username}
                  </h5>
                  {/* Profile link only visible when logged in */}
                  <Nav className="me-2">
                    <Nav.Link as={Link} to="/profile">
                      <i
                        className="bi bi-person-circle"
                        style={{
                          fontSize: "1.75rem",
                          color: "white",
                        }}
                      ></i>
                    </Nav.Link>
                  </Nav>
                  <Button
                    onClick={handleSubmit}
                    variant="danger"
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      padding: 0,
                    }}
                  >
                    <i
                      className="bi bi-box-arrow-right"
                      style={{
                        fontSize: "1.1rem",
                        size: "1rem",
                        color: "white",
                      }}
                    ></i>
                  </Button>
                </div>
              </>
            )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
