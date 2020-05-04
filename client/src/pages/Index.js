import React, { Component } from "react";
import { Jumbotron, Container, Image } from "react-bootstrap";
import Navbar from "../components/navbar";
import axios from "axios";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Signup from "../components/SignupForm";
import Logo from "../assets/images/logo.PNG";
import Main from "../pages/Main"

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
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
        <Route exact path="/main" component={Main} />
        <div>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
          {/* greet user if logged in: */}
          {this.state.loggedIn && <p>Logged in as: {this.state.username}</p>}
          <Jumbotron fluid>
            <Container>
              <h1>Book-it-Yourself</h1>
              <Image src={Logo} fluid />
              <Jumbotron>
                  <Route
                    path="/login"
                    render={() => <LoginForm updateUser={this.updateUser} />}
                  />
                  <Route path="/signup" render={() => <Signup />} />
              </Jumbotron>
            </Container>
          </Jumbotron>
        </div>
        </Switch>
      </Router>
    );
  }
}

export default Home;
