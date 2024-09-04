import { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "../styles/addProperty.css";

const AddProperty = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    propertyType: "",
    location: {
      address: "",
      city: "",
      coordinates: {
        lat: "",
        lng: "",
      },
    },
    price: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    images: [],
    status: "",
    agent: {
      name: "",
      contact: {
        phone: "",
        email: "",
      },
    },
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  const handleAgentChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      agent: {
        ...prevState.agent,
        [name]: value,
      },
    }));
  };

  const handleAgentContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      agent: {
        ...prevState.agent,
        contact: {
          ...prevState.agent.contact,
          [name]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <Container className="my-5" id="backgcontainer">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="property-form-box shadow-lg">
            <Card.Body>
              <h1 className="text-center mb-4">Add Property</h1>
              <Form onSubmit={handleSubmit}>
                {/* Step 1: Basic Details.. */}

                {step === 1 && (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formTitle" className="mb-3">
                          <Form.Label>Title</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter property title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formPropertyType"
                          className="mb-3"
                        >
                          <Form.Label>Property Type</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter property type"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter address"
                            name="address"
                            value={formData.location.address}
                            onChange={handleLocationChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formCity" className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter city"
                            name="city"
                            value={formData.location.city}
                            onChange={handleLocationChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group
                          controlId="formCoordinatesLat"
                          className="mb-3"
                        >
                          <Form.Label>Latitude</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter latitude"
                            name="lat"
                            value={formData.location.coordinates.lat}
                            onChange={handleLocationChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formCoordinatesLng"
                          className="mb-3"
                        >
                          <Form.Label>Longitude</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter longitude"
                            name="lng"
                            value={formData.location.coordinates.lng}
                            onChange={handleLocationChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-end">
                      <Button variant="warning" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </>
                )}
                {/* Step 2: Price and Description and etc.. */}

                {step === 2 && (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formPrice" className="mb-3">
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formDescription"
                          className="mb-3"
                        >
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="formBedrooms" className="mb-3">
                          <Form.Label>Bedrooms</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number of bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBathrooms" className="mb-3">
                          <Form.Label>Bathrooms</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number of bathrooms"
                            name="bathrooms"
                            value={formData.bathrooms}
                            onChange={handleChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formArea" className="mb-3">
                          <Form.Label>Area (in sq. ft.)</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter area"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                          />
                        </Form.Group>
                        <Form.Group controlId="formStatus" className="mb-3">
                          <Form.Label>Status</Form.Label>
                          <Form.Control
                            as="select"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                          >
                            <option value="" disabled hidden>
                              Choose Status
                            </option>
                            <option value="Available">Available</option>
                            <option value="Pending">Pending</option>
                            <option value="Sold">Sold</option>
                            <option value="Rented">Rented</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={handlePrevious}>
                        Previous
                      </Button>
                      <Button variant="warning" onClick={handleNext}>
                        Next
                      </Button>
                    </div>
                  </>
                )}

                {/* Step 3: Agent details and images */}
                {step === 3 && (
                  <>
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formAgentName" className="mb-3">
                          <Form.Label>Agent Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter agent name"
                            name="name"
                            value={formData.agent.name}
                            onChange={handleAgentChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formAgentPhone" className="mb-3">
                          <Form.Label>Agent Phone</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter agent phone"
                            name="phone"
                            value={formData.agent.contact.phone}
                            onChange={handleAgentContactChange}
                          />
                        </Form.Group>

                        <Form.Group controlId="formAgentEmail" className="mb-3">
                          <Form.Label>Agent Email</Form.Label>
                          <Form.Control
                            type="email"
                            placeholder="Enter agent email"
                            name="email"
                            value={formData.agent.contact.email}
                            onChange={handleAgentContactChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="formImages" className="mb-3">
                          <Form.Label>Upload Property Images</Form.Label>
                          <Form.Control
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12} className="d-flex justify-content-between">
                        <Button
                          variant="secondary"
                          onClick={handlePrevious}
                          className="w-25"
                        >
                          Previous
                        </Button>
                        <Button
                          variant="primary"
                          type="submit"
                          className="w-25"
                        >
                          Add Property
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProperty;
