import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import { useUpdateUserProfileMutation } from "../slices/userApiSlice"; // Import the Redux mutation
import "../styles/profilePage.css";

const ProfilePage = () => {
  // State to toggle between listings and sold items
  const [showListings, setShowListings] = useState(true);

  // State to handle modal visibility
  const [showEditModal, setShowEditModal] = useState(false);

  // Profile state
  const [username, setUsername] = useState("Michael");
  const [email, setEmail] = useState("michael.trust@email.com");

  // Separate modal state to store edits before submission
  const [tempUsername, setTempUsername] = useState(username);
  const [tempEmail, setTempEmail] = useState(email);
  const [tempPassword, setTempPassword] = useState(""); // Password is only temporary and not stored until save

  // Redux mutation to update the user profile
  const [updateUserProfile, { isLoading, isSuccess, isError }] =
    useUpdateUserProfileMutation();

  // Handle the modal visibility
  const handleShow = () => {
    setTempUsername(username); // Set current username to modal state
    setTempEmail(email); // Set current email to modal state
    setShowEditModal(true);
  };
  const handleClose = () => setShowEditModal(false);

  // Handle form submission (update the user data)
  const handleSaveChanges = async () => {
    try {
      const updatedUserData = {
        username: tempUsername, // Use modal state value
        email: tempEmail, // Use modal state value
        ...(tempPassword && { password: tempPassword }), // Only include password if it's provided
      };

      // Update profile through Redux mutation
      await updateUserProfile(updatedUserData).unwrap();

      // If successful, update the main state and close modal
      setUsername(tempUsername);
      setEmail(tempEmail);

      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile. Please try again.");
      console.error(error);
    }
    setShowEditModal(false);
  };

  return (
    <Container className="profile-page border-container">
      {/* Edit Button to trigger the modal */}
      <div className="d-flex justify-content-end">
        <Button variant="outline-danger" onClick={handleShow}>
          Edit
        </Button>
      </div>

      {/* User Info */}
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <div className="profile-header">
            <Image
              src="../../images/aip.webp"
              roundedCircle
              className="profile-image"
            />
            <h2 className="profile-name">{username}</h2>
            <p className="profile-email">{email}</p>
          </div>
        </Col>
      </Row>

      {/* Listings / Sold Toggle Buttons */}
      <Row>
        <Col className="text-center mb-4">
          <Button
            variant="outline-primary"
            className="toggle-btn"
            onClick={() => setShowListings(true)}
          >
            Listings
          </Button>
          <Button
            variant="outline-secondary"
            className="toggle-btn"
            onClick={() => setShowListings(false)}
          >
            Sold
          </Button>
        </Col>
      </Row>

      {/* Listings or Sold Items */}
      <Row className="listings-section">
        {showListings ? (
          <>
            {/* Current Listings */}
            <Col xs={12} md={6} lg={4} className="listing-card">
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h1.webp" />
                <Card.Body>
                  <Card.Title>Brookvale Villa</Card.Title>
                  <Card.Text>
                    $320/month <br /> Austin, Texas
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className="listing-card">
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h5.webp" />
                <Card.Body>
                  <Card.Title>The Overdale Apartment</Card.Title>
                  <Card.Text>
                    $290/month <br /> Jakarta, Indonesia
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className="listing-card">
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h4.webp" />
                <Card.Body>
                  <Card.Title>The Midnight House</Card.Title>
                  <Card.Text>
                    $1290/month <br /> New York, USA
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        ) : (
          <>
            {/* Sold Listings with "Sold" Tag */}
            <Col xs={12} md={6} lg={4} className="listing-card">
              <div className="sold-tag-container">
                <img
                  src="../../images/sold.png"
                  alt="Sold"
                  className="sold-tag"
                />
              </div>
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h4.webp" />
                <Card.Body>
                  <Card.Title>Sunset Villa</Card.Title>
                  <Card.Text>
                    $750,000 <br /> Miami, Florida
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={4} className="listing-card">
              <div className="sold-tag-container">
                <img
                  src="../../images/sold.png"
                  alt="Sold"
                  className="sold-tag"
                />
              </div>
              <Card className="equal-height-card">
                <Card.Img variant="top" src="../../images/h5.webp" />
                <Card.Body>
                  <Card.Title>Central Park Apartment</Card.Title>
                  <Card.Text>
                    $1,250,000 <br /> New York, USA
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </>
        )}
      </Row>

      {/* ---------------- Edit Modal ---------------- */}
      <Modal show={showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={tempUsername} // Using modal state value
                onChange={(e) => setTempUsername(e.target.value)} // Temporarily store
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={tempEmail} // Using modal state value
                onChange={(e) => setTempEmail(e.target.value)} // Temporarily store
              />
            </Form.Group>
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={tempPassword} // Using modal state value
                onChange={(e) => setTempPassword(e.target.value)} // Temporarily store
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
        {isError && (
          <p className="text-danger text-center">
            Failed to update profile. Please try again.
          </p>
        )}
        {isSuccess && (
          <p className="text-success text-center">
            Profile updated successfully!
          </p>
        )}
      </Modal>
    </Container>
  );
};

export default ProfilePage;
