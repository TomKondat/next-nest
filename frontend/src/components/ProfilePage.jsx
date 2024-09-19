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
  const { data, error, isLoading, refetch } = useGetUserInfoQuery(); // Add refetch here
  const [editUser] = useUpdateUserProfileMutation();

  // State for username and email
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // Show/Hide modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Populate the form with existing user data
  useEffect(() => {
    if (data) {
      setUsername(data?.data.user.username);
      setEmail(data?.data.user.email);
    }
  }, [data]);

  // Handle saving changes
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const formData = {
      newUsername: username,
      newEmail: email,
    };
    console.log("formData:", formData);

    try {
      // Update user data in the backend
      await editUser(formData).unwrap();

      // Optimistically update the UI
      alert("User information updated successfully!");

      // Close the modal
      handleClose();

      // Refetch the updated data to ensure UI is updated
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
            <h2 className="profile-name">{username}</h2>{" "}
            {/* Use updated state */}
            <p className="profile-email">{email}</p> {/* Use updated state */}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Change Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
