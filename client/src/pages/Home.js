//importing react and the {useQuery}
import { printIntrospectionSchema } from "graphql";
import React from "react";
import { Container } from "react-bootstrap";

import { useMutation } from '@apollo/client';
import { ADD_EXPLANATION } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = {
  question: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.4",
    marginTop: "100px",
    padding: "50px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    // justifyContent: 'center',
  },
  explanation: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#b92b27, #1565C0)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.4",
    marginTop: "100px",
    padding: "50px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    //justifyContent: 'center',
  },
  containerStyle: {
    opacity: "0.8",
    background: "transparent",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

// TODO: add logic to connect question and explanation boxes to addExplanation function
// handle form submit, form ,button, state for question. and then handle submit. 


// TODO: add functionality so user can save question/response if logged in (Auth)

const Home = () => {

  const [addExplanation, { error }] = useMutation(ADD_EXPLANATION)
  const handleFormSubmit (event) => {
    event.preventDefault() 
    try {
      const {data} = await addExplanation ({variables: {}})
    } catch (error) {
      
    }
  }

  return (
    <>
      <Container style={styles.containerStyle}>
        <Container fluid>
          <input
            type="text"
            placeholder="question box"
            style={styles.question}></input>
        </Container>
        <Container fluid>
          <input
            type="text"
            placeholder="explanation box"
            style={styles.explanation}></input>
        </Container>
      </Container>
    </>
  );
};

export default Home;
