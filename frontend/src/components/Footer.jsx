import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import logo from "../../images/NNlogo.png";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row className="mb-3">
          <Col md={4}>
            <h5>FAQ & Support</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/faq-support#faq" className="text-white">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/faq-support#support" className="text-white">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/faq-support#privacy" className="text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq-support#terms" className="text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </Col>
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={logo}
              alt="HeavenView Logo"
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
          </Col>
          <Col md={4} className="d-flex justify-content-md-end">
            <div>
              <h5>Newsletter</h5>
              <Form>
                <Row>
                  <Col xs={8} sm={9}>
                    <Form.Group controlId="formEmail">
                      <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        size="md"
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={4} sm={3}>
                    <Button variant="warning" type="submit" id="subscribe">
                      Subscribe
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="text-center" id="social">
          <Col>
            <h5>Follow Us</h5>
            <a href="https://www.facebook.com" className="text-white mx-2">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.twitter.com" className="text-white mx-2">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" className="text-white mx-2">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com" className="text-white mx-2">
              <FaLinkedin size={24} />
            </a>
          </Col>
        </Row>
        <Row className="text-center mt-3">
          <Col>
            <p>
              &copy; {new Date().getFullYear()} NextNest. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
