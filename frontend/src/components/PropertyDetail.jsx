import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import PropertyMap from "./PropertyMap";
import "../styles/propertyItem.css";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data } = useGetPropertiesQuery();
  const [editProperty] = useEditPropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();
  const navigate = useNavigate();

  const property = data?.properties.find((p) => p._id === id);

  // Modal state for Edit
  const [showEditModal, setShowEditModal] = useState(false);
  const [title, setTitle] = useState(property?.title || "");
  const [price, setPrice] = useState(property?.price || "");
  const [image, setImage] = useState(property?.image || "");
  const [description, setDescription] = useState(property?.description || "");

  // Modal state for Delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  if (!property) {
    return <h2 className="text-center">Property not found</h2>;
  }

  // Handle Edit Property
  const handleEditSubmit = async () => {
    try {
      const updatedProperty = {
        title,
        price,
        image,
        description,
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
      className="d-flex justify-content-center align-items-center vh-100 propertypage"
    >
      <Row className="w-100 d-flex justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card
            className="shadow-lg carddetail"
            style={{ padding: "20px", fontSize: "1.2rem" }}
          >
            <div className="editdeletebtn">
              <Button
                variant="outline-danger"
                className="editbtn"
                onClick={() => setShowEditModal(true)}
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                className="deletebtn"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </Button>
            </div>
            <Card.Img
              variant="top"
              src={
                property.image ||
                "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko="
              }
              alt={property.title}
              className="property-detail-image"
            />
            <Card.Body className="cardbody">
              <Card.Title className="text-center display-5">
                {property.title}
              </Card.Title>
              <Card.Text className="text-center">
                <strong>Price: </strong> ${property.price}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Description: </strong> {property.description}
              </Card.Text>
              <div className="d-flex justify-content-center">
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
              <div className="mt-4 map-wrapper">
                <PropertyMap
                  latitude={property.location.coordinates.lat}
                  longitude={property.location.coordinates.lng}
                  zoom={property.location.zoom}
                  title={property.title}
                />
              </div>
            </Card.Body>
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
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
            <Form.Group className="mb-3" controlId="formImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description of the property"
              />
            </Form.Group>
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
