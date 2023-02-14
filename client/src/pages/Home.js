//importing react and the {useQuery}
import { printIntrospectionSchema } from "graphql";
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

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
// TODO: add functionality so user can save question/response if logged in (Auth)

const Home = () => {

  // Create state for holding returned AI response
  const [searchedExplanation, setSearchedExplanation] = useState('');

  // Create state for user question
  const [userQuestion, setUserQuestion] = useState('');

  // Create state for ai response - not sure if necessary
  const [aiResponse, setAiResponse] = useState('');

  // Create addExplanation variable to use mutation
  const [addExplanation, { error }] = useMutation(ADD_EXPLANATION)

  // Method to send user question to AI and return response
  const handleFormSubmit = async (event) => {
    event.preventDefault(); 
    
    if (!userQuestion) {
      return false;
    }
    
    try {
      const { data } = await addExplanation({
        variables: {
          question: userQuestion,
          response: aiResponse
      },
    });

    setSearchedExplanation(data)
    setAiResponse(data.response)
    } catch (error) {
      console.error(err);
    }
  };

  // Function to handle saving explanation to database
  const handleSaveExplanation = async (explanationId) => {
    // find the explanation in `searchedExplanation` state by the matching id
    const explanationToSave = searchedExplanation.find((explanation) => explanation.explanationId === explanationId);

    // Get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await addExplanation({
        variables: { explanationData: { ...explanationToSave } },
      });
    
      // addExplanation([...searchedExplanation, explanationToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container style={styles.containerStyle}>
        <Container fluid>
        <Form onSubmit={handleFormSubmit}>
          <Form.Control
            name="userQuestion"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
            type="text"
            placeholder="question box"
            style={styles.question}
              />
          <Button type="submit" variant="success" size="lg">
                  Submit Question
          </Button>    
        </Form>
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
