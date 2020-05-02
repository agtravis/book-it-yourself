import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import NameCard from "../NameCard";
import FeedCard from "../FeedCard";

function FeedComponent() {
  return (
    <Jumbotron fluid>
      <Container>
        <NameCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </Container>
    </Jumbotron>
  );
}

export default FeedComponent;
