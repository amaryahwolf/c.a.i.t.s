import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

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
    padding: "150px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
  },
  explanation: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#b92b27, #1565C0)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.4",
    marginTop: "100px",
    padding: "150px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
  },
  containerStyle: {
    background: "transparent",
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
  },
  submit: {
    opacity: '1',
    backgroundColor: 'deeppink',
    borderColor: 'pink',
    borderWidth: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    display: 'block',
    paddingLeft: '50px',
    paddingRight: '50px',
    fontSize: '20px',
  },
  spinnerContainer: {
    position: "relative"
  },
  motion: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
};

const Home = () => {

  const [userQuestion, setUserQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Create addExplanation variable to use mutation
  const [addExplanation, { error }] = useMutation(ADD_EXPLANATION)

  useEffect(() => {
    console.log(aiResponse)
  }, [aiResponse])

  // Method to send user question to AI and return response
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true)
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
      setIsLoading(false)
    } catch (error) {
      console.error(error);
    }
  };

  // Method to clear forms so user can enter next code snippet
  const clearForms = async (event) => {
    event.preventDefault();
    setAiResponse('');
    setUserQuestion('');
  }

  // Method to copy AI's response to clipboard
  const handleCopy = async (event) => {
    event.preventDefault();
    const copyText = aiResponse;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  }

  return (
    <>
      <Container style={styles.containerStyle}>
        <Container fluid>
          <Form onSubmit={handleFormSubmit}>
            <Form.Control
              as="textarea"
              name="userQuestion"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              type="text"
              placeholder="Enter your code snippet here!"
              style={styles.question}
            />
            <Button type="submit" variant="success" style={styles.submit}>
              Submit Question
            </Button>
          </Form>
        </Container>
        
          <div style={styles.spinnerContainer}>
            {isLoading && (
              <motion.div initial={{ opacity: 1 }} exit={{ opacity: 1 }} animate={{ opacity: 1 }} style={styles.motion}>
                <div className="spinner-border text-light" role="status">
                  {/* TODO: replace with spinning BryanBot icon */}
                  <span className="visually-hidden">Loading...</span>
                </div>
              </motion.div>
            )}
            <Container
              fluid
              name="aiResponse"
              value={aiResponse}
              placeholder="View BryanBot's explanation here!"
              style={styles.explanation}
              as="textarea">
            {/* <FontAwesomeIcon icon="fa-regular fa-copy" onClick={handleCopy}/> */}
            </Container>
           
            <Button type="submit" variant="success" style={styles.submit} onClick={clearForms}>
              Next Question!
            </Button>
          </div>    
      </Container>
    </>
  );
};

export default Home;
