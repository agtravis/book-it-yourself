import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";
import Image from "react-bootstrap/Image";
import UserTest from "../../assets/images/userTest.png";

function FeedComponent() {
  return (
    <Jumbotron>
      <Card style={{ width: "auto" }}>
        <Card.Body>
          <Row>
            <Col md={"2"}>
              <Image src={UserTest} style={{ maxWidth: 80 }} roundedCircle />
            </Col>
            <Col>
              <h3>UserName</h3>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Jumbotron>
  );
}

export default FeedComponent;
