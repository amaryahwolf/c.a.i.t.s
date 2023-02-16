import React, { useState, useEffect } from "react";
import { Form, Button, Alert} from "react-bootstrap";

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
    marginBottom: "30px",
  },

  submit: {
    opacity: '3',
    backgroundColor: 'deeppink',
    borderColor: 'pink',
    borderWidth: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    marginBottom: '-10px',
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

  moon: {
    marginRight: '0',
    marginLeft: '1000px',
    display: 'block',
    position: 'absolute',
    marginTop: '-100px'
  },

  car: {
    marginRight: '0',
    marginLeft: '1100px',
    display: 'block',
        bottom: '10px',
        position: 'fixed'
       
  },

  car1: {
    marginRight: '0',
    marginLeft: '200px',
    display: 'block',
        bottom: '10px',
        position: 'fixed'
       
  },

allie: {

  marginRight: 'auto',
  marginLeft: '200px',
  display: 'inline-block',
  position: 'fixed',
  bottom: '20px'

},

shiba: {

  marginRight: 'auto',
  marginLeft: '280px',
  display: 'inline-block',
  position: 'fixed',
  bottom: '35px'

}

};
// check if form has everything (as per react-bootstrap docs)

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  console.log("rendered component");

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

  // Logic to check email, with alerts
  const emailValidator = () => {
    console.log(userFormData.email);
    if (!userFormData.email) {
      console.log("no email");
      setEmailError("Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(userFormData.email)) {
      console.log("wrong email");
      setEmailError("Incorrect email format");
      console.log(emailError);
    } else {
      setEmailError("");
    }
    console.log(emailError);
  };

  // Logic to double check PW credentials
  const passwordValidator = () => {
    if (!userFormData.password) {
      setPasswordError("Password is required");
    } else if (userFormData.password.length < 8) {
      setPasswordError("Password must have a minimum 8 characters");
    } else {
      setPasswordError("");
    }
  };

  return (
    <>
      <Image
        alt="stars"
        src="./images/stars.gif"
        style={styles.stars2}
        height="80"
      />

<Image
        alt="stars"
        src="./images/stars.gif"
        style={styles.stars1}
        height="50"
      />

<Image
        alt="moon"
        src="./images/moon.gif"
        style={styles.moon}
        height="100"
      />



      <Form onSubmit={handleFormSubmit} style={styles.body}>
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
          {emailError && <p>{emailError}</p>}
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
            onBlur={passwordValidator}
            required
          />
          {passwordError && <p>{passwordError}</p>}
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


      <Image
        alt="car"
        src="./images/car.gif"
        style={styles.car}
        width="100"
        height="100"
        className="float-right"
      />
      {/* <Image
        alt="car1"
        src="./images/car.gif"
        style={styles.car1}
        width="100"
        height="100"
        className="float-right"
      />
 */}
<Image
        alt="allie"
        src="./images/allie.png"
        style={styles.allie}
        width="150"
        height="100"
      />
<Image
        alt="shiba"
        src="./images/shiba.gif"
        style={styles.shiba}
        width="50"
        height="50"
      />


    </>
  );
};

export default Login;
