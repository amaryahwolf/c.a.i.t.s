import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Image} from "react-bootstrap";
import { motion } from 'framer-motion';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_EXPLANATION } from "../utils/mutations";


const styles = {
  question: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "1",
    marginTop: "100px",
    padding: "150px",
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
    opacity: "1",
    marginTop: "100px",
    padding: "150px",
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
    opacity: "1",
    backgroundColor: "deeppink",
    borderColor: "pink",
    borderWidth: "1px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    display: "block",
    paddingLeft: "50px",
    paddingRight: "50px",
    fontSize: "20px",
  },
  spinnerContainer: {
    position: "relative",
  },
  motion: {
    position: "absolute",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  sky: {

    marginRight: 'auto',
    marginLeft: '170px',
    display: 'inline-block',
    position: 'fixed',
    bottom: '80px'

  },

  amaryah: {

    marginRight: 'auto',
    marginLeft: '800px',
    display: 'inline-block',
    position: 'fixed',
    bottom: '80px'

  },
  marquee: {
    color: "white",
    display: "flex",
  },

};

const Home = () => {
  const [userQuestion, setUserQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [alert, setAlert] = useState(false);

  // Create addExplanation variable to use mutation
  const [addExplanation, { error }] = useMutation(ADD_EXPLANATION);
  const { loading, data } = useQuery(QUERY_ME, {
    fetchPolicy: "no-cache"
  });

  const userData = data?.me || null;
  console.log(userData);

  useEffect(() => {
    console.log(aiResponse);
  }, [aiResponse]);

  // Method to send user question to AI and return response
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!userData) {
      setAlert(true);
    }

    setIsLoading(true);

    if (!userQuestion) {
      return false;
    }

    try {
      const { data } = await addExplanation({
        variables: {
          question: userQuestion,
          response: aiResponse,
        },
      });
      console.log(data);
      setAiResponse(data.addExplanation.response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Method to clear forms so user can enter next code snippet
  const clearForms = async (event) => {
    event.preventDefault();
    setAiResponse("");
    setUserQuestion("");
  };

  // Method to copy AI's response to clipboard
  const handleCopy = async (event) => {
    event.preventDefault();
    const copyText = aiResponse;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
  };

 
  return (
    <>
      <div class="example5" style={styles.marquee}>
        <h3>Welcome to BryanBot 🤖 Get your code translated here! </h3>
      </div>
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
            <Button
              type="submit"
              variant="success"
              style={styles.submit}
              onClick={() => setAlert()}
            >
              Submit Question
            </Button>
            {alert && (
              <Alert
                variant="primary"
                onClose={() => setAlert(false)}
                dismissible
              >
                <Alert.Heading>Oops!</Alert.Heading>
                <p>
                  Please login or
                  signup to begin your journey with
                  BryanBot!
                </p>
              </Alert>
            )}
          </Form>
        </Container>

        <div style={styles.spinnerContainer}>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              style={styles.motion}
            >
              <div role="status">
              <img src="https://piskel-imgstore-b.appspot.com/img/38cc5c91-ae32-11ed-9b84-bb8b9bc91f9d.gif" alt="loading..." />
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
            as="textarea"
          >
            {/* <FontAwesomeIcon icon="fa-regular fa-copy" onClick={handleCopy}/> */}
          </Container>

          <Button
            type="submit"
            variant="success"
            style={styles.submit}
            onClick={clearForms}
          >
            Next Question!
          </Button>
        </div>
      </Container>

      <Image
        alt="sky"
        src="./images/sky.png"
        style={styles.sky}
        width="150"
        height="100"
      />

<Image
        alt="amaryah"
        src="./images/amaryah.png"
        style={styles.amaryah}
        width="180"
        height="90"
      />


    </>
  );
};

export default Home;
