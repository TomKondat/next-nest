import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import logo from "../../images/NNlogo.png";
import "../styles/navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  useLogoutMutation,
  useGetUserInfoQuery,
} from "./../slices/userApiSlice";
import { useDispatch } from "react-redux"; // To clear the user state on logout

const NavbarComponent = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation(); // To detect route change
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showElements, setShowElements] = useState(false);

  // Fetch user info
  const { data: userInfo } = useGetUserInfoQuery();
  const userRole = userInfo?.data?.user?.role || null;

  // Function to check login status from localStorage
  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(loginStatus === "true");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page on route change
  }, [location.pathname]); // Triggered whenever the path changes

  // Check login status initially and every time localStorage changes
  useEffect(() => {
    checkLoginStatus();

    if (localStorage.getItem("isLoggedIn") === "true") {
      // Delay showing the elements after login
      const timer = setTimeout(() => {
        setShowElements(true);
      }, 500);
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

      // Clear role-related UI after logout
      dispatch({ type: "user/clearUserInfo" }); // Action to clear user info

      // Redirect to homepage after logout
      navigate("/");

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

            {/* Conditionally render NavLinks based on user role */}
            {isLoggedIn && userRole === "agent" && (
              <>
                <Nav.Link as={Link} to="/addproperties">
                  Add Property
                </Nav.Link>
                <Nav.Link as={Link} to="/ManagedProperties">
                  Managed Properties
                </Nav.Link>
              </>
            )}
            {isLoggedIn && userRole === "buyer" && (
              <Nav.Link as={Link} to="/SavedProperties">
                Saved Properties
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {!isLoggedIn && (
              <Nav.Link as={Link} to="/login">
                Login/Register
              </Nav.Link>
            )}
          </Nav>

          {isLoggedIn && showElements && (
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
