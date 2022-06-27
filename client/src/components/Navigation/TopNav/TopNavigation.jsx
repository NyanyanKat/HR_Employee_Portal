import React from 'react'
import { Navbar, Nav, NavDropdown, Container,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



export default function TopNavigation() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='topNav'>
      <Container>
        <Navbar.Brand href="">HR PROJECT</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#"></Nav.Link> */}
          </Nav>
          <Nav>
          <Button variant="outline-success">Login</Button>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">Personal Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}