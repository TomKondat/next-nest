import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import "../styles/propertyItem.css";
import { RESAULT_NUM } from "../slices/urlConstrains";
import PropertyItem from "./PropertyItem";
import { useGetPropertiesQuery } from "./../slices/propertyApiSlice";

const PropertyList = ({ searchParams }) => {
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("price");

  const { data, error, isLoading } = useGetPropertiesQuery({ page, sort: sortOrder, ...searchParams });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error?.data?.message}</div>;

  const propertiesArr = data?.properties || [];
  const totalProperties = data?.totalProperties || 0;
  const totalPages = Math.ceil(totalProperties / RESAULT_NUM);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div className="property-list-wrapper">
      <h4>Searched Properties</h4>

      {/* Sort by dropdown */}
      <div className="sort-wrapper">
        <label htmlFor="sort">Sort by: </label>
        <select id="sort" value={sortOrder} onChange={handleSortChange}>
          <option value="price">Price (Low to High)</option>
          <option value="-price">Price (High to Low)</option>
        </select>
      </div>

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
        <button
          className="page-button"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          className="page-button"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PropertyList;
