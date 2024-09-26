import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/propertyItem.css";
import { DEFAULT_PROPERTY_IMG, UPLOADS_URL } from "../slices/urlConstrains";

const PropertyItem = ({ id, images, title, price, saleType }) => {
  let urlimage = images
    ? `${UPLOADS_URL}/${images}`
    : `${UPLOADS_URL}/${DEFAULT_PROPERTY_IMG}`;

  const forSaleImage = "../images/sale.png";
  const forRentImage = "../images/rent.png";

  return (
    <Link to={`/properties/${id}`} className="property-link">
      <Card className="property-item mb">
        <div className="image-wrapper">
          <Card.Img
            variant="top"
            src={urlimage}
            alt={title ? title : "No title available"}
            className="property-image"
          />
        </div>
        <Card.Body className="property-card-body">
          <div className="property-header">
            <Card.Title className="property-title">
              {title ? title : "No title available"}
            </Card.Title>
            <div className="property-badge">
              {saleType === "rent" ? (
                <img src={forRentImage} alt="For Rent" className="badge-img" />
              ) : (
                <img src={forSaleImage} alt="For Sale" className="badge-img" />
              )}
            </div>
          </div>
          <Card.Text>
            <strong>Price: </strong>
            {price ? `$${price}` : "Contact for price"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default PropertyItem;
