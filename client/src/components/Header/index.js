
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button, Image } from 'react-bootstrap';

import Auth from "../../utils/auth";

const styles = {
  buttonsLO: {
    fontSize: '30px',
    marginLeft: 'auto',
    marginRight: '40px',
    alignItems: 'flex-end',     
  },
  buttonsLI: {
    fontSize: '30px',
    alignItems: 'flex-end', 
    color: "white",
    opacity: 0.8,
    border: "none",
    marginLeft: "5px"
  },
};

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="Navbar">
      <Navbar bg="purple" variant="dark">
        <Container>
          <Link
             to="/contact">
        <Image
            alt="bryanbot"
            src="./images/logo4.jpg"
            width="170"
            height="110"
            className="d-inline-block mt-3"  
          />
          </Link>
          {" "}
          <Navbar.Brand to="/" style={styles.buttonsLO} >BryanBot</Navbar.Brand>

          {Auth.loggedIn() ? (
            <>
              <Link style={styles.buttonsLI} className="mr-5" to="/me">
                {Auth.getProfile().data.username}
              </Link>
              <Button style={styles.buttonsLI} type="button" className="btn btn-link" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (

            <>
              <Nav >
                <Link to="/login"
                  style={{fontSize:30}}
                    >Login</Link>
                <Link to="/signup"
                  style={{fontSize:30}}
                >Signup</Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>

    </header>
  );
};

export default Header;