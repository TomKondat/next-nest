import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/propertyItem.css";
const PropertyItem = ({ id, image, title, price }) => {
  return (
    <Card className="property-item">
      <div className="image-wrapper">
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className="property-image"
        />
      </div>
      <Card.Body className="property-card-body">
        <Card.Title className="property-title">{title}</Card.Title>
        <Card.Text>
          <strong>Price: </strong> {price}
        </Card.Text>
        <Button
          variant="primary"
          as={Link}
          to={`/properties/${id}`}
          className="view-property-btn"
        >
          View Property
        </Button>
      </Card.Body>
    </Card>
  );
};

PropertyItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default PropertyItem;
