import { Row, Col } from "react-bootstrap";
import { useGetPropertiesQuery } from "./../slices/propertyApiSlice";
import PropertyItem from "./PropertyItem";
import "../styles/propertyItem.css";
import { useState } from 'react';
import { RESAULT_NUM } from "../slices/urlConstrains";

const PropertyList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetPropertiesQuery({ page });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const propertiesArr = data?.properties || [];
  const totalProperties = data?.totalProperties || 0;
  const totalPages = Math.ceil(totalProperties / RESAULT_NUM);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="property-list-wrapper">
      <h4>Searched Properties</h4>
      <Row className="g-3">
        {propertiesArr.length > 0 ? (
          propertiesArr.map((property) => (
            <Col key={property._id} xs={12} sm={6} md={4} lg={3} xl={3}>
              <PropertyItem
                id={property._id}
                images={property.images[0]}
                title={property.title}
                price={property.price}
              />
            </Col>
          ))
        ) : (
          <div>No properties found</div>
        )}
      </Row>

      {/* Pagination controls */}
      <div className="pagination-controls page-button-wrapper">
        <button className="page-button"  onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>{   }Page {page} of {totalPages}{   }</span>
        <button className="page-button" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
