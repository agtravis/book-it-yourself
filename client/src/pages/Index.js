import React, { Component } from "react";
import { Row, Col, Container, Jumbotron, Image, Badge } from "react-bootstrap";
import axios from "axios";
import Nav from "../components/Nav";
import SideFeedComponent from "../components/SideFeedComponent";
import logo from '../assets/images/logo.PNG';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios.get("/api/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null,
          id: null,
        });
      }
    });
  };
  render() {
    return (
      <div>
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <div>
            <Jumbotron fluid>
              <Container>
                <h1>
                  <Badge variant="dark">Book-it-Yourself</Badge>
                </h1>
                <h3>
                  We connect artists and promoters together
                </h3>
                <Image src={logo} fluid />
              </Container>
            </Jumbotron>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
