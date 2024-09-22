import { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  useGetPropertiesQuery,
  useEditPropertyMutation,
  useDeletePropertyMutation,
} from "./../slices/propertyApiSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import PropertyMap from "./PropertyMap";
import "../styles/propertyItem.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const { state } = useLocation(); // Get the state passed from ManagedProperties
  const { data } = useGetPropertiesQuery();
  const [editProperty] = useEditPropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const navigate = useNavigate();

  const property = data?.properties.find((p) => p._id === id);

  // Modal state for Edit
  const [showEditModal, setShowEditModal] = useState(false);

  // Initialize state variables for the form fields
  const [title, setTitle] = useState(property?.title || "");
  const [propertyType, setPropertyType] = useState(
    property?.propertyType || ""
  );
  const [houseNumber, setHouseNumber] = useState(
    property?.location?.houseNumber || ""
  );
  const [street, setStreet] = useState(property?.location?.street || "");
  const [city, setCity] = useState(property?.location?.city || "");
  const [price, setPrice] = useState(property?.price || "");
  const [description, setDescription] = useState(property?.description || "");
  const [bedrooms, setBedrooms] = useState(property?.bedrooms || "");
  const [bathrooms, setBathrooms] = useState(property?.bathrooms || "");
  const [area, setArea] = useState(property?.area || "");

  // Modal state for Delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Scroll to top when component is mounted (route changes)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  if (!property) {
    return <h2 className="text-center">Property not found</h2>;
  }

  // Handle Edit Property
  const handleEditSubmit = async () => {
    try {
      const addressQuery = `${houseNumber} ${street}, ${city}`;
      const fetchCoordinates = async (query) => {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json`
        );
        const data = await response.json();
        return data.length > 0 ? { lat: data[0].lat, lng: data[0].lon } : null;
      };

      const coordinates = await fetchCoordinates(addressQuery);

      if (!coordinates) {
        alert("Failed to fetch coordinates. Please check the address.");
        return;
      }

      const updatedProperty = {
        title,
        propertyType,
        location: {
          houseNumber,
          street,
          city,
          coordinates: {
            lat: parseFloat(coordinates.lat),
            lng: parseFloat(coordinates.lng),
          },
        },
        price,
        description,
        bedrooms,
        bathrooms,
        area,
      };

      await editProperty({ data: updatedProperty, propertyId: id }).unwrap();

      alert("Property updated successfully!");
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update property:", err);
      alert("Failed to update property.");
    }
  };

  // Handle Delete Property
  const handleDelete = async () => {
    try {
      await deleteProperty(id).unwrap();
      alert("Property deleted successfully!");
      navigate("/"); // Redirect to homepage after deletion
    } catch (err) {
      console.error("Failed to delete property:", err);
      alert("Failed to delete property.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center propertypage py-5"
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card
            className="shadow-lg carddetail"
            style={{ padding: "20px", fontSize: "1.2rem" }}
          >
            {/* Buttons for Edit and Delete (shown only for managed properties) */}
            {state?.isManaged && (
              <div className="editdeletebtn d-flex justify-content-end mb-2">
                <Button
                  variant="outline-secondary"
                  className="editbtn"
                  onClick={() => setShowEditModal(true)}
                >
                  <Icon.Pencil />
                </Button>
                <Button
                  variant="outline-danger"
                  className="deletebtn"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <Icon.Trash />
                </Button>
              </div>
            )}
            {/* Property Title */}
            <Card.Title className="text-center display-5 mb-4">
              {property.title}
            </Card.Title>

            <Row className="property-details-row mb-4">
              <Col xs={12} md={8}>
                <Card.Img
                  variant="top"
                  src={
                    property.images[0] ||
                    "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
                  }
                  alt={property.title}
                  className="property-detail-image"
                />
              </Col>
              <Col xs={12} md={4} className="property-details-container">
                <Card.Text className="property-detail-item">
                  <strong>Property Type:</strong> {property.propertyType}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>House Number:</strong> {property.location.houseNumber}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>Street:</strong> {property.location.street}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>City:</strong> {property.location.city}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>Price:</strong> ${property.price}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </Card.Text>
                <Card.Text className="property-detail-item">
                  <strong>Area:</strong> {property.area} sq. ft.
                </Card.Text>
              </Col>
            </Row>

            {/* Description Section */}
            <Card.Text className="my-4 text-center">
              <strong>Description:</strong> {property.description}
            </Card.Text>

            {/* Map Section */}
            <div className="mt-4 map-wrapper">
              {property?.location?.coordinates?.lat &&
              property?.location?.coordinates?.lng ? (
                <PropertyMap
                  latitude={property.location.coordinates.lat}
                  longitude={property.location.coordinates.lng}
                  zoom={property.location.zoom}
                  title={property.title}
                />
              ) : (
                <p className="text-center">
                  Map information is not available for this property
                </p>
              )}
            </div>

            {/* Buttons Section */}
            <div className="d-flex justify-content-center flex-wrap mt-4">
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
          </Card>
        </Col>
      </Row>

      {/* ----------------Edit Modal---------------- */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formHouseNumber">
                  <Form.Label>House Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={houseNumber}
                    onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBedrooms">
                  <Form.Label>Bedrooms</Form.Label>
                  <Form.Control
                    type="number"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formArea">
                  <Form.Label>Area (in sq. ft.)</Form.Label>
                  <Form.Control
                    type="number"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPropertyType">
                  <Form.Label>Property Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Choose Property Type
                    </option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="land">Land</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formStreet">
                  <Form.Label>Street</Form.Label>
                  <Form.Control
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBathrooms">
                  <Form.Label>Bathrooms</Form.Label>
                  <Form.Control
                    type="number"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PropertyDetail;
