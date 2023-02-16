import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Image } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = {

  alert: {
    backgroundColor: 'violet',
    color: 'white',
  },

  body: {
    backgroundColor: 'white',
    marginTop: '80px',
    padding: '50px',
    opacity: '0.8',
    borderRadius: '20px',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  between: {
    marginBottom: '20px',
  },

  submit: {
    opacity: '3',
    backgroundColor: 'deeppink',
    borderColor: 'pink',
    borderWidth: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '-10px',
    marginTop: '40px',
    display: 'block',
    paddingLeft: '50px',
    paddingRight: '50px',
    fontSize: '20px',
    // fontFamily: "'Rubik Microbe', cursive",

  },

  heading: {
    color: 'white',
    fontSize: '30px',
    marginBottom: '-60px',
    marginTop: '2px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },

  pigeon: {
    marginRight: '0',
    marginLeft: '1100px',
    display: 'block',
        bottom: '10px',
        position: 'fixed'
       
  },

  pigeon1: {
    marginRight: '0',
    marginLeft: '1000px',
    display: 'block',
        bottom: '10px',
        position: 'fixed'
       
  },


  stars1: {
    marginRight: 'auto',
    marginLeft: '130px',
    marginTop: '130px',
    display: 'inline-block',
    position: 'absolute',
  },
  
  stars2: {
    marginRight: '0',
    marginLeft: '1100px',
    marginTop: '200px',
    display: 'block',
    position: "absolute"
  },

  vanessa: {

    marginRight: 'auto',
    marginLeft: '5px',
    display: 'inline-block',
    position: 'fixed',
    bottom: '10px'

  },

 hello: {

    marginRight: 'auto',
    marginLeft: '50px',
    display: 'inline-block',
    position: 'fixed',
    bottom: '110px'

  },

  chicken: {
    marginRight: '0',
    marginLeft: '510px',
    display: 'block',
    position: 'absolute',
    marginTop: '-10px'
  }



}


const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

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

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };



  return (
    <>
      <h1 style={styles.heading}> Why did the robot chicken cross the road?
He was programmed to. </h1>
      {/* This is needed for the validation functionality above */}

      <Image
        alt="chicken"
        src="./images/chicken.gif"
        style={styles.chicken}
        height="40"
      />


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


      <Form noValidate validated={validated} onSubmit={handleFormSubmit} style={styles.body}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group style={styles.between}>
          <Form.Label htmlFor='username' style={{ fontSize: '25px' }}>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={styles.between}>
          <Form.Label htmlFor='email' style={{ fontSize: '25px' }}>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group style={styles.between}>
          <Form.Label htmlFor='password' style={{ fontSize: '25px' }}>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'
          style={styles.submit}>
          Submit
        </Button>
      </Form>

      <Image
        alt="pigeon"
        src="./images/pigeon.gif"
        style={styles.pigeon}
        width="100"
        height="70"
        className="float-right"
      />

<Image
        alt="pigeon1"
        src="./images/pigeon.gif"
        style={styles.pigeon1}
        width="100"
        height="70"
        className="float-right"
      />


<Image
        alt="hello"
        src="./images/hellothere.png"
        style={styles.hello}
        width="150"
        height="50"
      />

<Image
        alt="vanessa"
        src="./images/vanessa.png"
        style={styles.vanessa}
        width="200"
        height="120"
      />



    </>
  );
};

export default Signup;
