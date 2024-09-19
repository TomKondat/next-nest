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
import "../styles/profilePage.css";

const ProfilePage = () => {
  const { data, error, isLoading, refetch } = useGetUserInfoQuery();
  const [editUser] = useUpdateUserProfileMutation();

  const [displayUsername, setDisplayUsername] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");

  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    // Populate modal fields with the current data
    setEditUsername(displayUsername);
    setEditEmail(displayEmail);
    setShow(true);
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
            <h2 className="profile-name">{displayUsername}</h2>
            <p className="profile-email">{displayEmail}</p>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
    </Container>
  );
};

export default ProfilePage;
