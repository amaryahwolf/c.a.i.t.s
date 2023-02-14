import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Image } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const styles = {
  alert: {
    backgroundColor: "violet",
    color: "white",
  },

  body: {
    backgroundColor: "white",
    marginTop: "100px",
    padding: "50px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },

  between: {
    marginBottom: "40px",
  },

  submit: {
    opacity: '3',
    backgroundColor: 'deeppink',
    borderColor: 'pink',
    borderWidth: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    display: 'block',
    paddingLeft: '50px',
    paddingRight: '50px',
    fontSize: '20px',
    fontFamily: "'VT323', monospace",

  },

  stars2: {
    marginRight: 'auto',
    marginLeft: '130px',
    marginTop: '130px',
    display: 'inline-block',
    position: 'absolute',
  },

  stars1: {
    marginRight: '0',
    marginLeft: '1100px',
    marginTop: '200px',
    display: 'block',
    position: "absolute"
  },



};
// check if form has everything (as per react-bootstrap docs)

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState("");
  console.log("rendered component")
  const [login, { error }] = useMutation(LOGIN_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setUserFormData({
      email: "",
      password: "",
    });
  };

  const emailValidator = () => {
    console.log(userFormData.email)
    if (!userFormData.email) {
      console.log("no email")
      setEmailError("Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(userFormData.email)) {
      console.log("wrong email")
      setEmailError("Incorrect email format");
      console.log(emailError)
    } else {
      setEmailError("")
    }
    console.log(emailError)
  };

  return (
    <>

<Image
        alt="stars"
        src="./images/stars.gif"
        style={styles.stars1}
        height="80"
      />

<Image
        alt="stars"
        src="./images/stars.gif"
        style={styles.stars2}
        height="50"
      />

    

      <Form
        onSubmit={handleFormSubmit}
        style={styles.body}
      >
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
          style={styles.alert}
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group style={styles.between}>
          <Form.Label htmlFor="email" style={{ fontSize: "25px" }}>
            Email
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            onBlur={emailValidator}
            required
          />
          {emailError && (
            <p>
              {emailError}
            </p>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password" style={{ fontSize: "25px" }}>
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>


        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'
          style={styles.submit}
          className='font'>
          Submit
        </Button>
      </Form>

    </>
  );
};

export default Login;
