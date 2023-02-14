import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = {

  alert: {
    backgroundColor: 'violet',
    color: 'white',
  },

  body: {
    backgroundColor: 'white',
    marginTop: '100px',
    padding: '50px',
    opacity: '0.8',
    borderRadius: '20px',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  between: {
    marginBottom: '40px',
  },

  submit: {
    opacity: '1',
    backgroundColor: 'deeppink',
    borderColor: 'pink',
    borderWidth: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '40px',
    display: 'block',
    paddingLeft: '50px',
    paddingRight: '50px',
    fontSize: '25px',
    // fontFamily: "'Rubik Microbe', cursive",

  },

  // font: {
    // fontFamily: "'Rubik Microbe', cursive",
  // },
}
    // check if form has everything (as per react-bootstrap docs)

const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      email: '',
      password: '',
    });
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} style={styles.body}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'
          style={styles.alert}>
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group style={styles.between}>
          <Form.Label htmlFor='email' style={{fontSize: '25px'}}>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group >
          <Form.Label htmlFor='password' style={{fontSize: '25px'}}>Password</Form.Label>
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