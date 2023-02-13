import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import Auth from '../utils/auth';
import { loginUser } from '../utils/API';

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
    // fontFamily: 'Rubik Microbe',

  },

  // font: {
  //   fontFamily: "'Rubik Microbe', cursive",
  // },
}


const Login = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

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
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
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
      </Form>

      <Button
        disabled={!(userFormData.email && userFormData.password)}
        type='submit'
        variant='success'
        style={styles.submit}>
        Submit
      </Button>
    </>
  );
};

export default Login;