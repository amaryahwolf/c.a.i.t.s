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
  CardQ: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    fontFamily: "Arial",
    textAlign: "center",
    opacity: "0.7",
    marginTop: "50px",
    padding: "50px",
    opacity: "0.8",
    borderRadius: "20px",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
  },
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
    <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s explanations!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
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
                <Card.Body>
                  <Card.Text style={styles.CardQ}>{explanation.question}</Card.Text>
                  <Card.Text>{explanation.response}</Card.Text>
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
