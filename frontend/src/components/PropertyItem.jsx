import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/propertyItem.css";

const PropertyItem = (props) => {
  return (
    <Link to={`/properties/${props.id}`} className="property-link">
      <Card className="property-item mb">
        <div className="image-wrapper">
          <Card.Img
            variant="top"
            src={
              props.image
                ? props.image
                : "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
            }
            alt={props.title ? props.title : "No title available"}
            className="property-image"
          />
        </div>
        <Card.Body className="property-card-body">
          <Card.Title className="property-title">
            {props.title ? props.title : "No title available"}
          </Card.Title>
          <Card.Text>
            <strong>Price: </strong>{" "}
            {props.price ? props.price : "Contact for price"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PropertyItem;
