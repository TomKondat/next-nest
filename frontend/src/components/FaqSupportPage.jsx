import { useEffect } from "react";
import "../styles/faq.css";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  Button,
  Card,
  InputGroup,
} from "react-bootstrap";

const FaqSupportPage = () => {
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <Container className="my-5" id="faq">
      <Card className="shadow-sm ">
        <Card.Body className="faqbg">
          <h1 className="text-center mb-4" id="faqheader">
            FAQ & Support
          </h1>

          <Row className="mb-5 " id="faq">
            <Col>
              <h2>Frequently Asked Questions</h2>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    How do I reset my password?
                  </Accordion.Header>
                  <Accordion.Body>
                    You can reset your password by clicking on the Forgot
                    Password link on the login page and following the
                    instructions.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    How can I contact customer support?
                  </Accordion.Header>
                  <Accordion.Body>
                    You can contact customer support by filling out the form
                    below or by calling our support line at 1-800-123-4567.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    What payment methods do you accept?
                  </Accordion.Header>
                  <Accordion.Body>
                    We accept various payment methods including Visa,
                    MasterCard, PayPal, and more.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          </Row>

          <Row id="support" className="mb-5">
            <Col md={{ span: 8, offset: 2 }}>
              <h2 className="mb-4">Contact Support</h2>
              <Form>
                <Form.Group controlId="supportName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group controlId="supportEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group controlId="supportMessage" className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="How can we help you?"
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" block>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>

          <Row id="privacy" className="mb-5">
            <Col>
              <h2>Privacy Policy</h2>
              <p>
                Your privacy is important to us. We are committed to ensuring
                that your information is secure. We do not share your personal
                information with third parties without your consent.
              </p>
            </Col>
          </Row>

          <Row id="terms" className="mb-5">
            <Col>
              <h2>Terms & Conditions</h2>
              <p>
                By using our service, you agree to the following terms and
                conditions. Please read them carefully before using our
                services.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FaqSupportPage;
