import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
import {
  useGetUserInfoQuery,
  useUpdateUserProfileMutation,
} from "../slices/userApiSlice";
import * as Icon from "react-bootstrap-icons";
import "../styles/profilePage.css";

const ProfilePage = () => {
  const { data, error, isLoading, refetch } = useGetUserInfoQuery();
  const [editUser] = useUpdateUserProfileMutation();

  const [displayUsername, setDisplayUsername] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [profileImage, setProfileImage] = useState("../../images/aip.webp");

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [show, setShow] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    // Populate modal fields with the current data
    setEditUsername(displayUsername);
    setEditEmail(displayEmail);
    setShow(true);
  };

  const handleImageClose = () => setShowImageModal(false);
  const handleImageShow = () => setShowImageModal(true);

  // Handle profile image change
  const handleImageChange = (e) => {
    alert("Image selected");
  };

  // Populate the profile with fetched user data
  useEffect(() => {
    if (data) {
      setDisplayUsername(data?.data.user.username);
      setDisplayEmail(data?.data.user.email);
    }
  }, [data]);

  // Handle saving changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = {
      newUsername: editUsername,
      newEmail: editEmail,
    };

    try {
      await editUser(formData).unwrap();
      setDisplayUsername(editUsername);
      setDisplayEmail(editEmail);

      handleClose();

      setEditUsername("");
      setEditEmail("");

      refetch();
    } catch (err) {
      console.error("Failed to update user information:", err);
      alert("Failed to update user information.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  return (
    <Container className="profile-page border-container">
      {/* Edit Button to trigger the modal */}
      <div className="d-flex justify-content-end ">
        <Button variant="outline-dark" onClick={handleImageShow}>
          <Icon.Camera />
        </Button>
        &nbsp; &nbsp;
        <Button variant="outline-secondary" onClick={handleShow}>
          <Icon.Pencil />
        </Button>
      </div>

      {/* User Info */}
      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <div className="profile-header">
            <div className="profile-image-container" onClick={handleImageShow}>
              <Image
                src={profileImage}
                roundedCircle
                className="profile-image"
              />
            </div>
            <h2 className="profile-name"> {displayUsername}</h2>
            <p className="profile-email">Email: {displayEmail}</p>
            <p className="profile-email">Phone: {displayEmail}</p>
          </div>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveChanges}>
            <Form.Group controlId="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Change Username"
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Change Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Change Profile Image Modal */}
      <Modal show={showImageModal} onHide={handleImageClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select new profile image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <Button variant="success" onClick={handleImageClose}>
              Save Image
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
