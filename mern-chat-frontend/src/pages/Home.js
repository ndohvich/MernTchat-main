import React from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
  return (
    <Row>
      <Col md={6} className = "d-flex flex-direction-column align-items-center justify-content-center">
        <div>
          <h1>Share the Word with your friends</h1>
          <p>Chat App lets you connect with the world</p>
          <LinkContainer to="/chat">
            <Button variant="danger">
              Get Started  <i className="fa fa-comments home-message-icon"></i>
            </Button>
          </LinkContainer>
        </div>
      </Col>
      <Col md={6} className="home__bg"></Col>
    </Row>
  );
}

export default Home