import { useState } from "react";
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
import "../styles/logreg.css";

const LoginRegisterPage = () => {
  const [key, setKey] = useState("login");

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
                  onSelect={(k) => setKey(k)}
                  className="mb-3 justify-content-center"
                >
                  <Tab eventKey="login" title="Login">
                    <Form>
                      <Form.Group controlId="formBasicEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          required
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
                        />
                      </Form.Group>

                      <Button variant="primary" type="submit" className="w-100">
                        Login
                      </Button>
                    </Form>
                  </Tab>

                  <Tab eventKey="register" title="Register">
                    <Form>
                      <Form.Group controlId="formRegisterName" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          required
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
