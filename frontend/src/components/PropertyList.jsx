import { Row, Col } from "react-bootstrap";
import { useGetPropertiesQuery } from "./../slices/propertyApiSlice";
import PropertyItem from "./PropertyItem";
import "../styles/propertyItem.css";

const PropertyList = () => {
  const { data, error, isLoading } = useGetPropertiesQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const propertiesArr = data?.properties || [];

  console.log("Fetched Properties:", propertiesArr);

  return (
    <div className="property-list-wrapper">
      <h4>Searched Properties</h4>
      <Row className="g-3">
        {" "}
        {/* Add gap between rows and columns */}
        {propertiesArr.length > 0 ? (
          propertiesArr.map((property) => (
            <Col key={property._id} xs={12} sm={6} md={4} lg={3} xl={3}>
              {" "}
              {/* Responsive sizes */}
              <PropertyItem
                id={property._id}
                image={property.image}
                title={property.title}
                price={property.price}
              />
            </Col>
          ))
        ) : (
          <div>No properties found</div>
        )}
      </Row>
    </div>
  );
};

export default PropertyList;
