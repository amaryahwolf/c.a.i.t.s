import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EXPLANATION } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = {
  jumbo:{
    color: "white",
    opacity: '0.8',
    viewHeight: "100%",
    textAlign: "center",
    marginTop: "50px",
    padding: "10px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '40px',
    fontFamily: "'VT323', monospace",
  },
  header:{
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    textAlign: "center",
    marginTop: "5px",
    padding: "5px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '30px',
    fontFamily: "'VT323', monospace",
  },
  body: {
    // background: "linear-gradient(#8E2DE2, #4A00E0)", 
    // background: 'rgba (0, 0, 0, 0.1) !important',
    backgroundColor: 'white',
    opacity: '0.8',
    display: 'flex',
    borderRadius: '5px',
    flexDirection: 'column'




  },
  question: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    textAlign: "center",
    margin: "10px",
    padding: "10px",
    // opacity: "0.8",
    borderRadius: "20px",
    width: "100%",
    flexWrap: "wrap",
    fontSize: '20px',
    fontFamily: "'VT323', monospace",
  },
  
  response:{
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#b92b27, #1565C0)",
    textAlign: "center",
    marginTop: "10px",
    padding: "10px",
    // opacity: "0.8",
    borderRadius: "20px",
    width: "100%",
    flexWrap: "wrap",
    fontSize: '20px',
    fontFamily: "'VT323', monospace",
  }, 
  button: {
    
  }
};

const Profile = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeExplanation, { error }] = useMutation(REMOVE_EXPLANATION);

  const userData = data?.me || {};

  // Function to handle explanation delete
  const handleDeleteExplanation = async (explanationId) => {
    console.log(explanationId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeExplanation({
        variables: { explanationId },
      });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  };
  console.log(userData.explanations);

  return (
    <>
    <Jumbotron fluid style={styles.jumbo}>
        <Container>
          <h1>Viewing {userData.username}'s Explanations!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 style={styles.header}>
          {userData.explanations?.length
            ? `You have ${userData.explanations.length} saved ${
                userData.explanations.length === 1 ? 'explanation' : 'explanations'
              }...`
            : 'You have no saved explanations! Head to Bryan Bot to begin your knowledge building journey!'}
        </h2>
        <CardColumns style={{overflow:"auto", height:"450px"}}>
          {userData.explanations?.map((explanation) => {
            return (
              <Card key={explanation.explanationId} border="dark" style={styles.body} >
                <Card.Body className="">
                  <Card.Text style={styles.question}>Code Block: {explanation.question}</Card.Text>
                  <Card.Text style={styles.response}>Explanation: {explanation.response}</Card.Text>
                  <Button
                    style={styles.button}
                    className="btn-danger"
                    onClick={() => handleDeleteExplanation(explanation.explanationId)}
                  >
                    Delete this Explanation!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default Profile;
