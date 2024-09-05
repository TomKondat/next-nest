import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/NNlogo.png";
import "../styles/navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
        &nbsp; NextNest
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbar-nav"
        className="bg-white"
        id="hamburger"
      />
      <Navbar.Collapse id="navbar-nav" className="justify-content-center">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/addproperties">
            Add Property
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link as={Link} to="/login">
            Login/Register
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            <i
              className="bi bi-person-circle"
              style={{ marginRight: "5px" }}
            ></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavbarComponent;
