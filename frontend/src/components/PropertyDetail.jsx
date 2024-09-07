import { useParams, Link } from "react-router-dom";
import properties from "../data/propertyData";
import "../styles/propertyItem.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id));

  if (!property) {
    return <h2>Property not found</h2>;
  }

  return (
    <div className="property-detail-container">
      <div className="property-detail">
        <h1 className="property-title">{property.title}</h1>
        <img
          src={property.image}
          alt={property.title}
          className="searched-property-image"
        />
        <p className="property-price">
          <strong>Price: </strong> {property.price}
        </p>
        <p className="property-description">
          <strong>Description: </strong> About the property.
        </p>
        <Link to="/">
          <button className="view-more-button">View More Properties</button>
        </Link>{" "}
      </div>
    </div>
  );
};

export default PropertyDetail;
