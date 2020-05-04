import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Jumbotron, Container, Image } from "react-bootstrap";
import axios from "axios";
import Navbar from "../components/Nav";
import LoginForm from "../components/LoginForm";
import Signup from "../components/SignupForm";
import Logo from "../assets/images/logo.PNG";
import Main from "../pages/Main";
import Profile from "../pages/Profile";

class Home extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     loggedIn: false,
  //     username: null,
  //     id: null,
  //   };
  // }

  // componentDidMount = () => {
  //   this.getUser();
  // };

  // updateUser = userObject => {
  //   this.setState(userObject);
  // };

  // getUser = () => {
  //   axios.get("/api/user/").then(response => {
  //     console.log("Get user response: ");
  //     console.log(response.data);
  //     if (response.data.user) {
  //       console.log("Get User: There is a user saved in the server session: ");

  //       this.setState({
  //         loggedIn: true,
  //         username: response.data.user.username,
  //         id: response.data.user._id,
  //       });
  //     } else {
  //       console.log("Get user: no user");
  //       this.setState({
  //         loggedIn: false,
  //         username: null,
  //         id: null,
  //       });
  //     }
  //   });
  // };

  render() {
    return (
      <div>
        {this.props.loggedIn ? (
          <p>Logged in as: {this.props.username}</p>
        ) : (
          <p>nobody logged in</p>
        )}
        {/* <Jumbotron fluid>
              <Container>
                <h1>Book-it-Yourself</h1>
                <Image src={Logo} fluid />
                <Jumbotron>
                  {/* <Route
                    path="/login"
                    render={() => <LoginForm updateUser={this.updateUser} />}
                  /> */}
        {/* <Route path="/signup" render={() => <Signup />} /> */}
        {/* </Jumbotron> */}
        {/* </Container> */}
        {/* </Jumbotron> */}
      </div>
    );
  }
}

export default Home;
