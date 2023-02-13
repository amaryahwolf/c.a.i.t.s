
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="headerPH">
      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand href="./Home">BrianBot</Navbar.Brand>
          {Auth.loggedIn() ? (
            <>
              <Link className="PH">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="PH" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Nav className="me-auto">
            <Nav.Link href="./Login" to="./Login">Login</Nav.Link>
            <Nav.Link href="./Signup" to="./Signup">Signup</Nav.Link>
          </Nav>
            </>
          )}
        </Container>
      </Navbar>
     
    </header>
  );
};

export default Header;