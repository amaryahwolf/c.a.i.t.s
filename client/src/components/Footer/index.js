import React from "react";
import { Nav, Container, Navbar, Image } from "react-bootstrap";

const styles = {

  contact: {
    marginLeft: '100px',
    fontSize: '20px',
    bottom: 'auto'


  }
}

const Footer = () => {
  return (
    <>
      <Navbar bg="" variant="light" fixed="bottom">
        <Container fixed>
          <Navbar.Brand href="#home">
          <Nav className="me-auto">
                <Nav.Link href="./Login" to="./Login"
                  style={styles.contact}
                >Contact Us</Nav.Link>
                </Nav>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
