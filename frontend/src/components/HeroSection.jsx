import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "../styles/heroSection.css";

const HeroSection = () => {
  const [activeButton, setActiveButton] = useState("buyer");

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  return (
    <div className="homepage d-flex align-items-center justify-content-center">
      <div className="homepage-overlay text-center">
        <h1 className="homepage-title">Find Your Ideal Property</h1>

        <div className="button-group mb-4">
          <button
            className={`btn-option ${activeButton === "buyer" ? "active" : ""}`}
            onClick={() => handleButtonClick("buyer")}
          >
            Buyer
          </button>
          <button
            className={`btn-option ${
              activeButton === "renter" ? "active" : ""
            }`}
            onClick={() => handleButtonClick("renter")}
          >
            Renter
          </button>
        </div>

        <Container className="search-container justify-content-center">
          <Row className="justify-content-center">
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                className="search-input"
              />
            </Col>
            <Col xs="auto">
              <Button variant="outline-warning" id="search">
                Search
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
