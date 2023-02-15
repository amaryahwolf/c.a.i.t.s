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
  cardMain:{
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    
  },
  CardQ: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#800080, #ffc0cb)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.8",
    marginTop: "10px",
    padding: "10px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '30px',
    fontFamily: "'VT323', monospace",
  },
  jumbo:{
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#FC466B, #3F5EFB)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.7",
    marginTop: "50px",
    padding: "10px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '40px',
    fontFamily: "'VT323', monospace",
  },
  cardR:{
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#1a2a6c, #b21f1f,#fdbb2d)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.7",
    marginTop: "5px",
    padding: "5px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '20px',
    fontFamily: "'VT323', monospace",
  },
  SavedE:{
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.7",
    marginTop: "5px",
    padding: "5px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '20px',
    fontFamily: "'VT323', monospace",
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
          <h1>Viewing {userData.username}'s explanations!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 style={styles.SavedE}>
          {userData.explanations?.length
            ? `Viewing ${userData.explanations.length} saved ${
                userData.explanations.length === 1 ? 'explanation' : 'explanations'
              }:`
            : 'You have no saved explanations! Head to Bryan Bot to begin your knowledge building journey!'}
        </h2>
        <CardColumns>
          {userData.explanations?.map((explanation) => {
            return (
              <Card key={explanation.explanationId} border="dark">
                <Card.Body style={styles.cardMain}>
                  <Card.Text style={styles.CardQ}>{explanation.question}</Card.Text>
                  <Card.Text style={styles.cardR}>{explanation.response}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
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
