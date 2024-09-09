import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Tab,
  Tabs,
  Card,
} from "react-bootstrap";
import {
  useLoginMutation,
  useRegisterMutation,
} from "./../slices/userApiSlice"; // Import the register mutation
import AuthContext from "../context/AuthContext";
import "../styles/logreg.css";

const LoginRegisterPage = () => {
  const { login } = useContext(AuthContext); // Use the login function from AuthContext
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState("login");

  // State for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for register
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Set the tab based on the current path
  useEffect(() => {
    if (location.pathname === "/register") {
      setKey("register");
    } else {
      setKey("login");
    }
  }, [location.pathname]);

  // Handle tab switching and navigation
  const handleSelect = (k) => {
    setKey(k);
    if (k === "register") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  const [loginRequest] = useLoginMutation();
  const [registerRequest] = useRegisterMutation(); // Add the register mutation

  // Handle Login Form Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };

    try {
      await loginRequest(formData).unwrap();
      console.log("Login Successful:", formData);

      // Call login function from AuthContext
      login(formData);

      // Wait 1 second before navigating to the homepage
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Failed to log in:", err);
      alert("Failed to log in.");
    }
  };

  // Handle Register Form Submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (regPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formData = {
      name: regName,
      email: regEmail,
      password: regPassword,
    };

    try {
      await registerRequest(formData).unwrap(); // Send the form data to the API
      console.log("Registration Successful:", formData);

      // Automatically log in the user after registration
      login(formData);

      // Wait 1 second before navigating to the homepage
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Failed to register:", err);
      alert("Failed to register.");
    }
  };

  return (
    <div className="overlay-container">
      <div className="overlay"></div>

      <Container
        fluid
        className="auth-container d-flex justify-content-center align-items-center"
      >
        <Row className="justify-content-md-center">
          <Col md={10} lg={10}>
            <Card className="auth-box shadow-lg">
              <Card.Body>
                <Tabs
                  id="auth-tabs"
                  activeKey={key}
                  onSelect={handleSelect}
                  className="mb-3 justify-content-center"
                >
                  <Tab eventKey="login" title="Login">
                    <Form onSubmit={handleLoginSubmit}>
                      <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        controlId="formBasicPassword"
                        className="mb-3"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit" className="w-100">
                        Login
                      </Button>
                    </Form>
                  </Tab>

                  <Tab eventKey="register" title="Register">
                    <Form onSubmit={handleRegisterSubmit}>
                      <Form.Group controlId="formRegisterName" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        controlId="formRegisterEmail"
                        className="mb-3"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        controlId="formRegisterPassword"
                        className="mb-3"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Create password"
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group
                        controlId="formConfirmPassword"
                        className="mb-3"
                      >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>

                      <Button variant="success" type="submit" className="w-100">
                        Register
                      </Button>
                    </Form>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginRegisterPage;
