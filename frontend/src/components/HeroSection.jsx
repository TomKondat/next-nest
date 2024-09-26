import { useState } from "react";
import { Button, Container, Row, Col, Dropdown } from "react-bootstrap";
import "../styles/heroSection.css";

const HeroSection = ({ updateSearchParams }) => {
  const [activeButton, setActiveButton] = useState("sell");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedRooms, setSelectedRooms] = useState("");

  const handleButtonClick = (type) => {
    setActiveButton(type);
  };

  const handleSearch = () => {
    const params = {
      propertyType:
        selectedPropertyType !== "Property Type" ? selectedPropertyType : null,
      priceRange:
        selectedPriceRange !== "Price Range" ? selectedPriceRange : null,
      propertyType:
        selectedPropertyType !== "Property Type" ? selectedPropertyType : null,
      priceRange:
        selectedPriceRange !== "Price Range" ? selectedPriceRange : null,
      bedrooms: selectedRooms !== "Bedrooms" ? selectedRooms : null,
      saleType: activeButton,
    };

    updateSearchParams(params);
  };

  const handleReset = () => {
    setActiveButton("sell");
    setSelectedPropertyType("");
    setSelectedPriceRange("");
    setSelectedRooms("");
    updateSearchParams({});
  };

  return (
    <div className="homepage">
      <div className="image-overlay">
        <div className="overlay-content">
          <h1 className="homepage-title text-center">
            Find Your Ideal Property
          </h1>
          <Col xs="auto">
            <Button
              className={`btn-filter ${
                activeButton === "sell" ? "active" : ""
              }`}
              onClick={() => handleButtonClick("sell")}
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

          <div className="filter-bar">
            <Container>
              <Row className="align-items-center justify-content-center">
                <Col xs="auto">
                  <Dropdown onSelect={(e) => setSelectedPropertyType(e)}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="property-selector"
                      variant="warning"
                    >
                      {selectedPropertyType || "Property Type"}
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

                <Col xs="auto">
                  <Dropdown onSelect={(e) => setSelectedPriceRange(e)}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="price-selector"
                      variant="warning"
                    >
                      {selectedPriceRange || "Price Range"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="0-200000">
                        $0 - $200,000
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="200000-500000">
                        $200,000 - $500,000
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="500000+">
                        $500,000+
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col xs="auto">
                  <Dropdown onSelect={(e) => setSelectedRooms(e)}>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      className="rooms-selector"
                      variant="warning"
                    >
                      {selectedRooms || "Bedrooms"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="1">1 Bedroom</Dropdown.Item>
                      <Dropdown.Item eventKey="2">2 Bedrooms</Dropdown.Item>
                      <Dropdown.Item eventKey="3">3+ Bedrooms</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                <Col xs="auto">
                  <Button className="search-button" onClick={handleSearch}>
                    <i
                      className="bi bi-search"
                      style={{ fontSize: "1.2rem" }}
                    ></i>
                  </Button>
                </Col>

                <Col xs="auto">
                  <Button
                    className="reset-button"
                    onClick={handleReset}
                    variant="secondary"
                  >
                    Reset{" "}
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
