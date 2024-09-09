import { useParams, Link } from "react-router-dom";
import { useGetPropertiesQuery } from "./../slices/propertyApiSlice";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../styles/propertyItem.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data } = useGetPropertiesQuery();

  const property = data?.properties.find((p) => p._id === id);

  if (!property) {
    return <h2 className="text-center">Property not found</h2>;
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 propertypage"
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card
            className="shadow-lg"
            style={{ padding: "20px", fontSize: "1.2rem" }}
          >
            <Card.Img
              variant="top"
              src={property.image}
              alt={property.title}
              className="property-detail-image"
            />
            <Card.Body>
              <Card.Title className="text-center display-5">
                {property.title}
              </Card.Title>
              <Card.Text className="text-center">
                <strong>Price: </strong> {property.price}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Description: </strong> About the property.
              </Card.Text>
              <div className="d-flex justify-content-center">
                <Link className="m-2" to="/">
                  <Button variant="warning" size="md">
                    View More Properties
                  </Button>
                </Link>
                <Link className="m-2" to="/profile">
                  <Button variant="warning" size="md">
                    Contact the Seller
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetail;
