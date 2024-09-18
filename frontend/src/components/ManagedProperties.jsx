import React from "react";
import {
  useGetUserInfoQuery,
  useGetManagedPropertiesByIdQuery,
} from "../slices/userApiSlice";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import "../styles/SavedProperties.css";

const ManagedProperties = () => {
  // Fetch user info
  const {
    data: userInfo,
    isLoading: userInfoLoading,
    isError: userInfoError,
  } = useGetUserInfoQuery();

  // Fetch managed properties (only for agents)
  const {
    data: managedPropertiesData,
    isLoading: managedPropertiesLoading,
    isError: managedPropertiesError,
  } = useGetManagedPropertiesByIdQuery();

  // Loading states
  if (userInfoLoading || managedPropertiesLoading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  // Error handling
  if (userInfoError || managedPropertiesError) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Error: Failed to load data.</Alert>
      </Container>
    );
  }

  // Check if the user is an agent
  const userRole = userInfo?.data?.user?.role;
  if (userRole !== "agent") {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          Access Denied: Only agents can view this page.
        </Alert>
      </Container>
    );
  }

  // Get managed properties data
  const propertiesArr = managedPropertiesData?.data?.managedProperties || [];

  return (
    <Container className="managed-properties-container mt-5">
      <h1 className="text-center mb-4">Managed Properties</h1>
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
          <p className="text-center">No managed properties yet.</p>
        )}
      </Row>
    </Container>
  );
};

export default ManagedProperties;
