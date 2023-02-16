import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Row,
  Col,
  Image
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_EXPLANATION } from '../utils/mutations';

import Auth from '../utils/auth';

const styles = {
  jumbo: {
    color: "white",
    viewHeight: "100%",
    textAlign: "center",
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    flexWrap: "wrap",
    fontSize: '40px',
    fontFamily: "'VT323', monospace",
  },
  header: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    textAlign: "center",
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
    backgroundColor: 'white',
    opacity: '0.8',
    display: 'flex',
    borderRadius: '5px',
  },
  question: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#8E2DE2, #4A00E0)",
    textAlign: "center",
    margin: "10px",
    padding: "10px",
    borderRadius: "20px",
    width: "50%",
    flexWrap: "wrap",
    fontSize: '25px',
    fontFamily: "'VT323', monospace",
  },
  response: {
    color: "white",
    viewHeight: "100%",
    background: "linear-gradient(#b92b27, #1565C0)",
    textAlign: "center",
    marginTop: "10px",
    padding: "10px",
    borderRadius: "20px",
    width: "50%",
    flexWrap: "wrap",
    fontSize: '25px',
    fontFamily: "'VT323', monospace",
  },
  button: {
    opacity: '1',
    backgroundColor: 'deeppink',
    borderColor: 'pink',
    borderWidth: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10px',
    display: 'block',
    paddingLeft: '70px',
    paddingRight: '70px',
    fontSize: '20px'
  },

  stars1: {
    marginRight: 'auto',
    marginLeft: '280px',
    marginTop: '30px',
    display: 'inline-block',
    position: 'absolute',
  },

  stars2: {
    marginRight: 'auto',
    marginLeft: '980px',
    marginTop: '30px',
    display: 'inline-block',
    position: 'absolute',
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
      <Image
        alt="stars"
        src="./images/stars.gif"
        style={styles.stars1}
        height="50"
      />


<Image
        alt="stars"
        src="./images/stars.gif"
        style={styles.stars2}
        height="50"
      />
      <Jumbotron fluid style={styles.jumbo}>
        <Container>
          <h1>Viewing {userData.username}'s Explanations!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2 style={styles.header}>
          {userData.explanations?.length
            ? `You have ${userData.explanations.length} saved ${userData.explanations.length === 1 ? 'explanation' : 'explanations'
            }...`
            : 'You have no saved explanations! Head to Bryan Bot to begin your knowledge building journey!'}
        </h2>
        <CardColumns style={{ overflow: "auto", height: "500px" }}>
          {userData.explanations?.map((explanation) => {
            return (
              <Card key={explanation.explanationId} border="dark" style={styles.body} >
                <Card.Body className="">
                  <Row>
                    <Col style={styles.question}>Code Block: {explanation.question}</Col>
                    <Col style={styles.response}>Explanation: {explanation.response}</Col>
                  </Row>
                  <Button
                    style={styles.button}
                    className="btn-danger"
                    onClick={() => handleDeleteExplanation(explanation.explanationId)}>
                    Delete
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
