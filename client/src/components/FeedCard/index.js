import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import UserTest from "../../assets/images/userTest.png";

function FeedCard(props) {
  return (
    <Jumbotron>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <h1>{props.title}</h1>
          <p>Location: {props.location}.</p>
          <p>
            When: {Date(props.startDate)}
            {props.endDate !== `` ? ` until ${Date(props.endDate)}` : null}.
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
