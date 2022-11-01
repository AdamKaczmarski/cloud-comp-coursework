import React from "react";
import Row from "react-bootstrap/Row";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const Header = () => {
  return (
    <>
    <Navbar bg="light" variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={{color:"white"}}>Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link className="mx-3">UserStats</Nav.Link>
          <Nav.Link className="mx-3">GlobalStats</Nav.Link>
          <Nav.Link className="mx-3">Login/out</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;
