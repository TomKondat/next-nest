import { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import { useAddPropertyMutation } from "../slices/propertyApiSlice";
import { useNavigate } from "react-router-dom";
import "../styles/addProperty.css";

const AddProperty = () => {
  const navigate = useNavigate();
  const [addProperty, { isLoading }] = useAddPropertyMutation();

  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [images, setImages] = useState(null);
  const [saleType, setSaleType] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("propertyType", propertyType);
    formData.append("location[houseNumber]", houseNumber);
    formData.append("location[street]", street);
    formData.append("location[city]", city);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("area", area);
    formData.append("saleType", saleType);

    if (images) {
      if (images.length) {
        Array.from(images).forEach((image) => {
          formData.append("image", image);
        });
      } else {
        formData.append("image", images);
      }
    }

    try {
      await addProperty(formData).unwrap();
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setErrorMessage(
        err?.data?.message || "Error adding property. Please try again."
      );
    }
  };

  return (
    <div className="addproperty">
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <Card className="property-form-box shadow-lg">
              <Card.Body>
                <h1 className="text-center mb-4">Add Property</h1>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter property title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formPropertyType" className="mb-3">
                        <Form.Label>Property Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={propertyType}
                          onChange={(e) => setPropertyType(e.target.value)}
                          required
                        >
                          <option value="" disabled hidden>
                            Choose Property Type
                          </option>
                          <option value="residential">Residential</option>
                          <option value="industrial">Industrial</option>
                          <option value="commercial">Commercial</option>
                          <option value="land">Land</option>
                          <option value="mixed-use">Mixed-Use</option>
                          <option value="retail">Retail</option>
                          <option value="hospitality">Hospitality</option>
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="formCity" className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formStreet" className="mb-3">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="formHouseNumber" className="mb-3">
                        <Form.Label>House Number</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter house number"
                          value={houseNumber}
                          onChange={(e) => setHouseNumber(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formDescription" className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          placeholder="Enter description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="formBedrooms" className="mb-3">
                        <Form.Label>Bedrooms</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number of bedrooms"
                          value={bedrooms}
                          onChange={(e) => setBedrooms(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formBathrooms" className="mb-3">
                        <Form.Label>Bathrooms</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter number of bathrooms"
                          value={bathrooms}
                          onChange={(e) => setBathrooms(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formArea" className="mb-3">
                        <Form.Label>Area (in sq. ft.)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter area"
                          value={area}
                          onChange={(e) => setArea(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group controlId="formSaleType" className="mb-3">
                        <Form.Label>Sale Type</Form.Label>
                        <Form.Control
                          as="select"
                          value={saleType}
                          onChange={(e) => setSaleType(e.target.value)}
                          required
                        >
                          <option value="" disabled hidden>
                            Choose Sale Type
                          </option>
                          <option value="sell">Sell</option>
                          <option value="rent">Rent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="formPrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          required
                        />
                      </Form.Group>

                      <Form.Group controlId="formImage" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                          type="file"
                          multiple
                          onChange={(e) => setImages(e.target.files)}
                          accept="image/*"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="warning" type="submit" className="w-50">
                      {isLoading ? "Adding..." : "Add Property"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
              {/* Success Alert */}
              {showSuccessAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowSuccessAlert(false)}
                  dismissible
                >
                  Property added successfully!
                </Alert>
              )}

              {/* Error Alert */}
              {showErrorAlert && (
                <Alert
                  variant="danger"
                  onClose={() => setShowErrorAlert(false)}
                  dismissible
                >
                  {errorMessage}
                </Alert>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProperty;
