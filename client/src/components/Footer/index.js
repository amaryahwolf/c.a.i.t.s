import React from "react";
import { Container, Navbar} from "react-bootstrap";
import ReactPlayer from 'react-player'



const Footer = () => {
  
  return (
    <>
    
      <Navbar bg="" variant="light" fixed="bottom">
        <Container fixed>
          <Navbar.Brand href="#home">
          <div className='player-wrapper'>
        <ReactPlayer
          light={<img src='https://example.com/thumbnail.png' alt='Thumbnail' />}
          className='react-player'
          url='https://www.youtube.com/watch?v=jOdbf-8s5ZY'
          width='0'
          height='0'
          loop = 'true' 
          playing = 'true'
        />
      </div>
          </Navbar.Brand>
        </Container>
      </Navbar> 
    </>
  );
};

export default Footer;
