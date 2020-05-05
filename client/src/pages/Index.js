import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Row, Col, Jumbotron, Container, Image } from "react-bootstrap";
import axios from "axios";
import Nav from "../components/Nav";
import LoginForm from "../components/LoginForm";
import Signup from "../components/SignupForm";
import Logo from "../assets/images/logo.PNG";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import SideFeedComponent from "../components/SideFeedComponent";
import FeedComponent from "../components/FeedComponent";

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
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
        });
      } else {
        console.log("Get user: no user");
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
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <div>
              {this.state.loggedIn ? (
                <p>Logged in as: {this.state.username}</p>
              ) : (
                <p>nobody logged in</p>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;
