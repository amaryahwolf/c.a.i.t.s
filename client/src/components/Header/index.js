import { assertValidSchema } from "graphql";
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
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">BrianBot</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#Login">Login</Nav.Link>
            <Nav.Link href="#Signup">Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

        <div>
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
              <Link className="PH" to="/login">
                Login
              </Link>
              <Link className="PH" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
     
    </header>
  );
};

export default Header;