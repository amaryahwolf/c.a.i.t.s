import React from "react";
import{Container, Navbar} from 'react-bootstrap';

const Footer = () => {
  return (
    <>
   
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/brianbotlogo.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        
      </Navbar.Brand>
    </Container>
  </Navbar>
  </>
  );
};

export default Footer;
