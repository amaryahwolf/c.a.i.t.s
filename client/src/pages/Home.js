//importing react and the {useQuery}
import { printIntrospectionSchema } from "graphql";
import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useMutation } from '@apollo/client';
import { ADD_EXPLANATION } from '../utils/mutations';

// import Auth from '../utils/auth';

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

const Home = () => {

  // Create state for user question
  const [userQuestion, setUserQuestion] = useState('');

  // Create state for ai response - not sure if necessary
  const [aiResponse, setAiResponse] = useState('');

  // Create addExplanation variable to use mutation
  const [addExplanation, { error }] = useMutation(ADD_EXPLANATION)

  // Console log aiResponse so we can see its value
  useEffect(() => {
    console.log(aiResponse)
  },[aiResponse])

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
    console.log(data)
    setAiResponse(data.addExplanation.response)
    } catch (error) {
      console.error(error);
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
            placeholder="Enter your code snippet here!"
            style={styles.question}
              />
          <Button type="submit" variant="success" size="lg">
                  Submit Question
          </Button>    
        </Form>
        </Container>
        <Container fluid>
          <input
          
            name="aiResponse"
            value={aiResponse}
            
            placeholder="View BryanBot's explanation here!"
            style={styles.explanation}></input>
        </Container>
      </Container>
    </>
  );
};

export default Home;
