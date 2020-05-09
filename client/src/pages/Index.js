import React, { Component } from "react";
import { Container, Jumbotron, Image, Badge, Row } from "react-bootstrap";
import axios from "axios";
import Nav from "../components/Nav";
import "./style.css";
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
      <div className="mainbg">
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Row className="justify-content-md-center">
          <Jumbotron className="homecontain" fluid>
            <Container>
              <h1 style={{ textAlign: "center" }}>
                <Badge variant="dark">Book-it-Yourself</Badge>
              </h1>

              <Image
                className="logo"
                style={{
                  textAlign: "center",
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  width: 400,
                }}
                src={logo}
                fluid
              />
              <h3 style={{ textAlign: "center" }}>
                <Badge variant="dark">Connect artists and promoters</Badge>
              </h3>
              <h3 style={{ textAlign: "center" }}>
                <Badge variant="dark">in one App</Badge>
              </h3>
            </Container>
          </Jumbotron>
        </Row>
      </div>
    );
  }
}

export default Home;
