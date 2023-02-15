import React from "react";
import { Nav, Container, Navbar, Image } from "react-bootstrap";

const styles = {

  contact: {
    fontSize: '24px',
    opacity: 0.8,
    bottom: 'auto',
    color: "white"
  }
};

const Footer = () => {
  return (
    <>
      <Navbar bg="" variant="light" fixed="bottom">
        <Container fixed>
          <Navbar.Brand href="#home">
          <Nav className="">
           <Image
            alt="bryanbot"
            src="./images/logo4.jpg"
            width="150"
            height="100"
            className="d-inline-block align-top"
          />
            <Nav.Link href="./Contact" to="./Contact"
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
