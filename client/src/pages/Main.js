import React from "react";
import FeedComponent from "../components/FeedComponent";
import SideFeedComponent from "../components/SideFeedComponent";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "../components/Nav";

class Main extends React.Component {
    constructor() {
        super()
    }

  render() {
    return (
      <div>
          <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8}xs={12}>
            <FeedComponent />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Main;
