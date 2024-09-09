import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "../styles/addProperty.css";

const AddProperty = () => {
  const [title, setTitle] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title,
      propertyType,
      address,
      city,
      price,
      description,
      bedrooms,
      bathrooms,
      area,
    };
    console.log("Form Data Submitted:", formData);
    alert("Property has been added!");
  };

  return (
    <Container className="my-5">
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
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="Land">Land</option>
                      </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="formAddress" className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
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
                    <Form.Group controlId="formDescription" className="mb-3">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
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
                  </Col>
                </Row>

                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" type="submit" className="w-50">
                    Add Property
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProperty;
