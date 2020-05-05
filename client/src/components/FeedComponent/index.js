import React, { Component } from "react";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import NameCard from "../NameCard";
import FeedCard from "../FeedCard";
import Nav from "../Nav";
import SideFeedComponent from "../SideFeedComponent";
import axios from "axios";

class FeedComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: `bruce`,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get("/api/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          username: response.data.user.username,
          id: response.data.user._id,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          username: null,
          id: null,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <Jumbotron fluid>
              <Container>
                <p>{this.state.username} - username</p>
                <NameCard username={this.state.username} />
                <FeedCard />
                <FeedCard />
                <FeedCard />
                <FeedCard />
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default FeedComponent;
