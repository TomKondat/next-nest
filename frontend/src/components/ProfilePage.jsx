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
import { Link } from "react-router-dom"; // Import Link for navigation
import {
  useGetUserInfoQuery,
  useUpdateUserProfileMutation,
  useUpdateUserImageMutation,
} from "../slices/userApiSlice";
import * as Icon from "react-bootstrap-icons";
import "../styles/profilePage.css";
import { UPLOADS_URL } from "../slices/urlConstrains";

const ProfilePage = () => {
  const { data, error, isLoading, refetch } = useGetUserInfoQuery();

  const userRole = data?.data?.user?.role || null;

  const [editUser] = useUpdateUserProfileMutation();
  const [editImage] = useUpdateUserImageMutation();

  const [displayUsername, setDisplayUsername] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const [show, setShow] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditUsername(displayUsername);
    setEditEmail(displayEmail);
    setEditPhone(displayPhone);
    setShow(true);
  };

  const handleImageClose = () => setShowImageModal(false);
  const handleImageShow = () => setShowImageModal(true);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      await editImage(formData).unwrap();
      setProfileImage(URL.createObjectURL(file));
      handleImageClose();
      refetch();
    } catch (err) {
      console.error("Failed to update profile image:", err);
      alert("Failed to update profile image.");
    }
  };

  useEffect(() => {
    if (data) {
      setDisplayUsername(data?.data.user.username);
      setDisplayEmail(data?.data.user.email);
      setDisplayPhone(data?.data.user.phone);
      setProfileImage(data?.data.user.image);
    }
  }, [data]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = {
      newUsername: editUsername,
      newEmail: editEmail,
      newPhone: editPhone,
    };

    try {
      await editUser(formData).unwrap();
      setDisplayUsername(editUsername);
      setDisplayEmail(editEmail);
      setDisplayPhone(editPhone);
      handleClose();

      setEditUsername("");
      setEditEmail("");
      setEditPhone("");

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
      <div className="d-flex justify-content-end ">
        {/* <Button variant="outline-dark" onClick={handleImageShow}>
          <Icon.Camera />
        </Button>
        &nbsp; &nbsp; */}
        <Button variant="outline-secondary" onClick={handleShow}>
          <Icon.Pencil />
        </Button>
      </div>

      <Row className="justify-content-center">
        <Col xs={12} md={8} className="text-center">
          <div className="profile-header">
            <div>
              <Image
                onClick={handleImageShow}
                src={`${UPLOADS_URL}/${profileImage}`}
                roundedCircle
                className="profile-image profile-image-container"
              />
            </div>
            <h2 className="profile-name"> {displayUsername}</h2>
            <p className="profile-email">
              <strong>Email:</strong> {displayEmail}
            </p>
            <p className="profile-email">
              <strong>Phone:</strong> {displayPhone}
            </p>
          </div>
        </Col>
      </Row>

      {/* Agent-Specific Buttons */}
      {userRole === "agent" && (
        <div className="mb-3 text-center">
          <Button
            as={Link}
            to="/addproperties"
            variant="warning"
            className="me-2"
          >
            Add Property
          </Button>
          <Button as={Link} to="/ManagedProperties" variant="warning">
            Managed Properties
          </Button>
        </div>
      )}

      {/* Buyer-Specific Buttons */}
      {userRole === "buyer" && (
        <div className="mb-3 text-center">
          <Button as={Link} to="/SavedProperties" variant="warning">
            Saved Properties
          </Button>
        </div>
      )}

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

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Change Phone Number"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
              />
            </Form.Group>

            <Button variant="warning" type="submit">
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
            <Button variant="warning" onClick={handleImageClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
