import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import PropertyItem from "./PropertyItem";
import "../styles/propertyItem.css";

const PropertyList = ({ properties = [] }) => {
  return (
    <div className="property-list-wrapper">
      <Row>
        <h4>Searched Properties</h4>
        {properties.map((property) => (
          <Col key={property.id} xs={12} md={4}>
            <PropertyItem
              id={property.id}
              image={property.image}
              title={property.title}
              price={property.price}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

PropertyList.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PropertyList;
