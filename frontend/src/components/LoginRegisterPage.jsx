import { useState, useEffect } from "react";
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
} from "./../slices/userApiSlice";
import "../styles/logreg.css";

const LoginRegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [key, setKey] = useState("login");

  // Add user state
  const [user, setUser] = useState(null);

  // Login states
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [register] = useRegisterMutation();
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [username, setUsername] = useState("");

  // Fetch user data using useGetUserInfoQuery
  const { data: userInfo, refetch } = useGetUserInfoQuery();

  // Update user state when data is fetched
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    if (location.pathname === "/register") {
      setKey("register");
    } else {
      setKey("login");
    }
  }, [location.pathname]);

  const handleSelect = (k) => {
    setKey(k);
    if (k === "register") {
      navigate("/register");
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      const userData = await login(formData).unwrap();

      setUser(userData.data);

      localStorage.setItem("username", userData.data.username);
      localStorage.setItem("isLoggedIn", "true");

      window.dispatchEvent(new Event("storage"));

      // Refetch user info after login
      refetch();

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Failed to log in:", err);
      alert("Failed to log in.");
    }
  };

  // Register Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      username,
      email: regEmail,
      password: regPassword,
      confirmPassword: regConfirmPassword,
    };

    try {
      await register(formData).unwrap();
      setTimeout(() => {
        navigate("/login"); // Redirect to the login page
      }, 1000);
    } catch (err) {
      console.error("Failed to register:", err);
      alert("Failed to Register.");
    }
  };

  return (
    <div className="overlay-container">
      {/* Background overlay */}
      <div className="overlay"></div>

      {/* Content */}
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
                    <Form onSubmit={handleSubmit}>
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

                  {/* Register form */}
                  <Tab eventKey="register" title="Register">
                    <Form onSubmit={handleRegister}>
                      <Form.Group controlId="formRegisterName" className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your Username"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                          value={regConfirmPassword}
                          onChange={(e) =>
                            setRegConfirmPassword(e.target.value)
                          }
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
