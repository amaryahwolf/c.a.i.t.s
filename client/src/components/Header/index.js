
import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

import Auth from "../../utils/auth";

const styles = {


  button: {
        fontSize: '30px',
        marginLeft: 'auto',
        marginRight: '40px',
        alignItems: 'flex-end',
        // paddingRight: '20px',
        
  }

}


const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="Navbar">
      <Navbar bg="purple" variant="dark">
        <Container>
          <Image
            alt="bryanbot"
            src="./images/logo4.jpg"
            width="150"
            height="80"

            className="d-inline-block align-top"
          />{" "}
          <Navbar.Brand href="./" style={styles.button} >BryanBot</Navbar.Brand>
          {Auth.loggedIn() ? (
            <>
              <Link className="PH" to="./me">
                {Auth.getProfile().data.username}

              </Link>
              <button className="PH" onClick={logout}>
                Logout
              </button>
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