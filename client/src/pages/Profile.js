import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Jumbotron, Container, Image } from "react-bootstrap";
import Navbar from "../components/Nav";
import axios from "axios";
import Main from "../pages/Main";
import Home from "../pages/Index";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
    };
  }

  componentDidMount = () => {
    this.getUser();
  }

  updateUser = userObject => {
    this.setState(userObject);
  }

  getUser = () => {
    axios.get("/api/user/").then(response => {
      console.log("Get user response: ");
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
  }

  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/main" component={Main} />
        <div>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {this.state.loggedIn && <p>Logged in as: {this.state.username}</p>}
          <Jumbotron fluid>
            <Container>
              <h1>My profile</h1>
            </Container>
          </Jumbotron>
        </div>
        </Switch>
      </Router>
    );
  }
}

export default Profile;
