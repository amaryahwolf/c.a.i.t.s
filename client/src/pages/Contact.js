import React from "react";
import { Container } from "react-bootstrap";

const styles = {
    body: {
        backgroundColor: "white",
        marginTop: "100px",
        padding: "50px",
        opacity: "0.8",
        borderRadius: "20px",
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
      },
      text: {
        color: "black",
        fontSize: "30px"

      }
}

const Contact = () => {
    return (
        <Container style={styles.body}>
            <h1>Charlie's Angels in the Sky</h1>
            <a href="https://github.com/Allie-Ang" target="__blank" style={styles.text}>Allie Ang</a> <br></br>
            <a href="https://github.com/amaryahwolf" target="__blank" style={styles.text}>Amaryah Wolf</a> <br></br>
            <a href="https://github.com/sjk777" target="__blank" style={styles.text}>Sky Kim</a> <br></br>
            <a href="https://github.com/vchan852" target="__blank" style={styles.text}>Vanessa Chan</a> <br></br>
        </Container>
    )
};

export default Contact