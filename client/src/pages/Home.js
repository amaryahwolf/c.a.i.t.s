//importing react and the {useQuery}
import { printIntrospectionSchema } from "graphql";
import React from "react";
import { Container } from "react-bootstrap";
const question = {
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
};

const explanation = {
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
};

const containerStyle = {
  opacity: "0.8",
  background: "transparent",
  display: "flex",
  marginLeft: "auto",
  marginRight: "auto",
};

const Home = () => {
  return (
    <>
      <Container style={containerStyle}>
        <Container fluid>
          <input
            type="text"
            placeholder="question box"
            style={question}></input>
        </Container>
        <Container fluid>
          <input
            type="text"
            placeholder="explanation box"
            style={explanation}></input>
        </Container>
      </Container>
    </>
  );
};

export default Home;
