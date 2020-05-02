import React from "react";
import FeedComponent from "../components/FeedComponent";
import SideFeedComponent from "../components/SideFeedComponent";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Main extends React.Component {
  render() {
    return (
      <div>
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
