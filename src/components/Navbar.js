import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FaBook } from 'react-icons/fa'; 

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2 fs-4">
          <FaBook />
          Library<span className="fw-light">Manager</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="me-auto gap-3">
            <Nav.Link as={Link} to="/" className="nav-hover">Home</Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="nav-hover">Favorites</Nav.Link>
            <Nav.Link as={Link} to="/advanced-search" className="nav-hover">Advanced Search</Nav.Link>
            <Nav.Link as={Link} to="/add-book" className="nav-hover">Add Book</Nav.Link>
          </Nav>
          <SearchBar />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
