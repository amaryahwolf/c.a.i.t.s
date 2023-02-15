
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

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
          {" "}
          <Navbar.Brand href="./" style={styles.buttonsLO} >BryanBot</Navbar.Brand>

          {Auth.loggedIn() ? (
            <>
              <Nav.Link style={styles.buttonsLI} className="mr-5" href="./me" to="./me">
                {Auth.getProfile().data.username}
              </Nav.Link>
              <Button style={styles.buttonsLI} type="button" className="btn btn-link" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (

            <>
              <Nav >
                <Nav.Link href="./Login" to="./Login"
                  style={{fontSize:30}}
                    >Login</Nav.Link>
                <Nav.Link href="./Signup" to="./Signup"
                  style={{fontSize:30}}
                >Signup</Nav.Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>

    </header>
  );
};

export default Header;