import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetUserInfoQuery,
  useGetManagedPropertiesByIdQuery,
} from "../slices/userApiSlice";
import { Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import "../styles/propertyItem.css"; // Using the updated CSS styles

const ManagedProperties = () => {
  const navigate = useNavigate();

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
        <Spinner animation="border" role="status"></Spinner>
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

  const handleCardClick = (property) => {
    // Navigate to PropertyDetail with property information as state
    navigate(`/properties/${property._id}`, {
      state: { isManaged: true, property },
    });
  };

  return (
    <Container fluid className="property-list-wrapper pt-5">
      <h4>Managed Properties</h4>
      <Row className="g-3">
        {propertiesArr.length > 0 ? (
          propertiesArr.map((property) => (
            <Col key={property._id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <div
                className="property-item clickable-card"
                onClick={() => handleCardClick(property)}
                role="button"
                tabIndex="0"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCardClick(property);
                }}
              >
                <div className="image-wrapper">
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="property-image"
                  />
                </div>
                <div className="property-card-body">
                  <h5 className="property-title">{property.title}</h5>
                  <p className="property-price">${property.price}</p>
                </div>
              </div>
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
