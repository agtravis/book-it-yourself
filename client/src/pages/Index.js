import React, { Component } from "react";
import { Row, Col, Container, Jumbotron, Image, Badge } from "react-bootstrap";
import axios from "axios";
import Nav from "../components/Nav";
import SideFeedComponent from "../components/SideFeedComponent";
import logo from "../assets/images/logo.PNG";

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
      <div style={{ paddingBottom: 170 }}>
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

        <Jumbotron style={{}} fluid>
          <Container>
            <h1 style={{ textAlign: "center" }}>
              <Badge variant="dark">Book-it-Yourself</Badge>
            </h1>
            <h3 style={{ textAlign: "center" }}>
              helps to connect with artists and promoters
            </h3>
            <Image
              style={{
                textAlign: "center",
                display: "block",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                width: 500,
              }}
              src={logo}
              fluid
            />
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
