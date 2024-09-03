import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/HVlogo.png";
import "../styles/navbar.css";

const NavbarComponent = () => (
  <Navbar expand="lg" fixed="top" className="navbar-transparent">
    <Container fluid>
      <Navbar.Brand as={Link} to="/" className="text-white">
        <img
          src={logo}
          alt="Logo"
          width="30"
          height="30"
          className="d-inline-block align-top color"
        />
        {""}
        HeavenView.
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="justify-content-center">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavbarComponent;
