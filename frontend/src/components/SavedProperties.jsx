import React from "react";
import { useGetPropertiesQuery } from "../slices/propertyApiSlice";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";

const SavedProperties = () => {
  // Fetch the properties from the API
  const {
    data: properties,
    isLoading,
    isError,
    error,
  } = useGetPropertiesQuery();
  console.log(properties);

  if (isLoading) {
    return (
      <Container className="mt-5">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Error: {error?.message || "Failed to load properties"}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Saved Properties</h1>
      <Row>
        {properties && properties.length > 0 ? (
          properties.map((property) => (
            <Col md={4} key={property.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={property.image}
                  alt={property.name}
                />
                <Card.Body>
                  <Card.Title>{property.name}</Card.Title>
                  <Card.Text>{property.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${property.price}
                  </Card.Text>
                  <Button variant="primary">View Property</Button>
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
