import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "../styles/savedProperties.css";

const SavedProperties = () => {
  // Demo array of saved properties
  const properties = [
    {
      id: 1,
      name: "Luxury Villa",
      description: "A beautiful villa located in the heart of California.",
      price: 1500000,
      image: "https://via.placeholder.com/300x200?text=lala",
    },
    {
      id: 2,
      name: "Modern Apartment",
      description: "A stylish apartment in the bustling city of New York.",
      price: 850000,
      image: "https://via.placeholder.com/300x200?text=lala",
    },
    {
      id: 3,
      name: "Cozy Cottage",
      description: "A peaceful cottage surrounded by nature.",
      price: 450000,
      image: "https://via.placeholder.com/300x200?text=lala",
    },
  ];

  let userId = "66e1a0e0c02a39599e3f78b0";
  return (
    <div className="savedproperties">
      <Container className="saved-properties-container mt-5">
        <h1 className="text-center mb-4">Saved Properties</h1>
        <Row>
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <Col md={4} key={property.id} className="mb-4">
                <Card className="property-card h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={property.image}
                    alt={property.name}
                    className="saved-card-image"
                  />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{property.name}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      {property.description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ${property.price}
                    </Card.Text>
                    <Button variant="warning" className="mt-auto">
                      View Property
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center">No saved properties yet.</p>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default SavedProperties;
