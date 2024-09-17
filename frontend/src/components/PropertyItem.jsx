import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/propertyItem.css";

const PropertyItem = (props) => {
  //console.log (props.images)
  let urlimage=`http://localhost:8000/${props.images}`
  //console.log(urlimage)

  return (
    <Link to={`/properties/${props.id}`} className="property-link">
      <Card className="property-item mb">
        <div className="image-wrapper">
          <Card.Img
            variant="top"
            src={urlimage}
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
