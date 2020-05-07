import React from "react";
import Card from "react-bootstrap/Card";
import TestPhoto from "../../assets/images/test.png";

function FeedComponent() {
  return (
    <Card style={{ width: "auto" }}>
      <Card.Img variant="top" src={TestPhoto} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content. Some quick example text to build on the
          card title and make up the bulk of the card's content. Some quick
          example text to build on the card title and make up the bulk of the
          card's content. Some quick example text to build on the card title and
          make up the bulk of the card's content. Some quick example text to
          build on the card title and make up the bulk of the card's content.
          Some quick example text to build on the card title and make up the
          bulk of the card's content. Some quick example text to build on the
          card title and make up the bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FeedComponent