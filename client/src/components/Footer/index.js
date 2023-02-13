import React from "react";
import { Container, Navbar, Image } from "react-bootstrap";

const Footer = () => {
  return (
    <>
      <Navbar bg="" variant="light" fixed="bottom">
        <Container fixed>
          <Navbar.Brand href="#home">
            <Image
              alt="brianbot"
              src="./images/logo4.jpg"
              width="150"
              height="100"
              className="d-inline-block align-top"

            />{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};

export default Footer;
