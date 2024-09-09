import { useState } from "react";
import { Button, Container, Form, Row, Col, Dropdown } from "react-bootstrap";
import "../styles/heroSection.css";

const HeroSection = () => {
  const [activeButton, setActiveButton] = useState("buy");

  // State to store selected filter values
  const [selectedPropertyType, setSelectedPropertyType] =
    useState("Property Type");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Price Range");
  const [selectedRooms, setSelectedRooms] = useState("Rooms");

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  return (
    <div className="homepage">
      {/* Overlay Image */}
      <div className="image-overlay">
        <div className="overlay-content">
          {/* Heading */}
          <h1 className="homepage-title text-center">
            Find Your Ideal Property
          </h1>
          {/* Buy & Rent Buttons */}

          <Col xs="auto">
            <Button
              className={`btn-filter ${activeButton === "buy" ? "active" : ""}`}
              onClick={() => handleButtonClick("buy")}
              variant="warning"
            >
              Buy
            </Button>
            <Button
              className={`btn-filter ${
                activeButton === "rent" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("rent")}
              variant="warning"
            >
              Rent
            </Button>
          </Col>
          {/* Filter Bar */}
          <div className="filter-bar">
            <Container>
              <Row className="align-items-center justify-content-center">
                {/* Search Inputs */}
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Search Address"
                    className="search-input"
                  />
                </Col>

                {/* Property Type Dropdown */}
                <Col xs="auto">
                  <Dropdown onSelect={(e) => setSelectedPropertyType(e)}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="property-selector"
                      variant="warning"
                    >
                      {selectedPropertyType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="House">House</Dropdown.Item>
                      <Dropdown.Item eventKey="Apartment">
                        Apartment
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Commercial">
                        Commercial
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="Residential">
                        Residential
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Price Range Dropdown */}
                <Col xs="auto">
                  <Dropdown onSelect={(e) => setSelectedPriceRange(e)}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="price-selector"
                      variant="warning"
                    >
                      {selectedPriceRange}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="$100,000 - $200,000">
                        $100,000 - $200,000
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="$200,000 - $500,000">
                        $200,000 - $500,000
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="$500,000+">
                        $500,000+
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Rooms Dropdown */}
                <Col xs="auto">
                  <Dropdown onSelect={(e) => setSelectedRooms(e)}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="rooms-selector"
                      variant="warning"
                    >
                      {selectedRooms}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1 Room">1 Room</Dropdown.Item>
                      <Dropdown.Item eventKey="2 Rooms">2 Rooms</Dropdown.Item>
                      <Dropdown.Item eventKey="3+ Rooms">
                        3+ Rooms
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Search Button */}
                <Col xs="auto">
                  <Button variant="warning" className="search-button">
                    <i
                      className="bi bi-search"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
