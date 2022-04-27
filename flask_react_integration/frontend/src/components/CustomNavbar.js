import React from "react";
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

function CustomNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">RMSafe</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Link to="/testing">
              <Nav.Link href="/testing">Testing</Nav.Link>
            </Link>
            <Link to="/livefeed">
              <Nav.Link href="/livefeed">Live Feed</Nav.Link>
            </Link>
            <Link to="/faqs">
              <Nav.Link href="/faqs">FAQs</Nav.Link>
            </Link>
            <Link to="/about">
              <Nav.Link href="/about">About</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
