import React from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";

function FeedCard(props) {
  return (
    <Jumbotron>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <h1>{props.title}</h1>
          <p>Location: {props.location}.</p>
          <p>
            When: {new Date(props.startDate).toString()}
            {props.endDate !== ``
              ? ` until ${new Date(props.endDate).toString()}`
              : null}
            .
          </p>
          <p>Description: {props.description}</p>

          {/* <Row>
            <Col md={"2"}>
              <Image src={UserTest} style={{ maxWidth: 80 }} roundedCircle />
            </Col>
            <Col>
              <h3>{props.username}</h3>
            </Col>
          </Row> */}
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}

export default FeedCard;
