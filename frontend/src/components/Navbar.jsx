import { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container, Button, Image, Alert } from "react-bootstrap"; // Imported Alert component
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../images/NNlogo.png";
import "../styles/navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
  useLogoutMutation,
  useGetUserInfoQuery,
} from "./../slices/userApiSlice";
import { DEFAULT_USER_IMG, UPLOADS_URL } from "../slices/urlConstrains";
import { useDispatch } from "react-redux"; // To clear the user state on logout

const NavbarComponent = () => {
  const { data: userInfo } = useGetUserInfoQuery();

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showElements, setShowElements] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");

  const navbarRef = useRef(null);

  const checkLoginStatus = () => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  };

  useEffect(() => {
    if (userInfo?.data?.user?.username) {
      setUsername(userInfo.data.user.username);
    }
  }, [userInfo]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    checkLoginStatus();

    if (localStorage.getItem("isLoggedIn") === "true") {
      const timer = setTimeout(() => {
        setShowElements(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setShowElements(false);
    }

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  const handleSubmit = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      setShowElements(false);

      dispatch({ type: "user/clearUserInfo" });

      navigate("/");

      setAlertMessage("Logged out successfully.");
      setAlertVariant("danger");
    } catch (err) {
      console.error("Failed to Logout:", err);

      setAlertMessage("Failed to logout.");
      setAlertVariant("danger");
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="navbar-transparent"
        expanded={expanded}
        ref={navbarRef}
      >
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
            onClick={() => setExpanded(!expanded)}
          />
          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={handleNavLinkClick}>
                Home
              </Nav.Link>
            </Nav>
            {alertMessage && (
              <Alert
                variant={alertVariant}
                onClose={() => setAlertMessage(null)}
                dismissible
                className="mt-2"
              >
                {alertMessage}
              </Alert>
            )}
            <Nav>
              {!isLoggedIn && (
                <Nav.Link as={Link} to="/login" onClick={handleNavLinkClick}>
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
                      textTransform: "capitalize",
                    }}
                  >
                    Hi, {username}
                  </h5>
                  <Nav className="me-2">
                    <Nav.Link
                      as={Link}
                      to="/profile"
                      onClick={handleNavLinkClick}
                    >
                      <Image
                        src={`${UPLOADS_URL}/${userInfo?.data.user.image}`}
                        roundedCircle
                        alt={userInfo?.data.user.username}
                        className="navbar-image"
                      />
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
    </>
  );
};

export default NavbarComponent;
