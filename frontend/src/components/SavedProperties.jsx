import React from "react";
import {
  useGetUserInfoQuery,
  useGetSavedPropertiesByIdQuery,
} from "../slices/userApiSlice";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import "../styles/SavedProperties.css";

const SavedProperties = () => {
  // Fetch the saved properties for this user
  const user = useGetUserInfoQuery();
  const userRole = user.data.data.user.role;

  const { data } = useGetSavedPropertiesByIdQuery();
  const propertiesArr = data.data.savedProperties || [];
  console.log(propertiesArr);

  // // Only allow access if the role is 'buyer'
  if (userRole !== "buyer") {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Access Denied: Only buyers can view this page.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="saved-properties-container mt-5">
      <h1 className="text-center mb-4">Saved Properties</h1>
      <Row>
        {propertiesArr.length > 0 ? (
          propertiesArr.map((property) => (
            <Col md={4} key={property._id} className="mb-4">
              <Card className="property-card h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={property.image}
                  alt={property.name}
                  className="card-image"
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{property.name}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {property.description}
                  </Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${property.price}
                  </Card.Text>
                  <Button variant="primary" className="mt-auto">
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
  );
};

export default SavedProperties;
