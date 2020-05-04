import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";
import Home from "../../pages/Index";

class NavigationBar extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null,
    };
  }

  logout = event => {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/api/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null,
            id: null,
          });
          this.setState({
            redirectTo: "/",
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect
          to={{ pathname: this.state.redirectTo }}
          render={() => <Home />}
        />
      );
    } else {
    const loggedIn = this.props.loggedIn;
    console.log(this.props);
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="/">Homepage</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {loggedIn ? (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/main">feed</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/profile">profile</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/" onClick={this.logout}>
                      logout
                    </Link>
                  </Nav.Link>
                </Nav.Item>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/login">login</Link>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <Link to="/signup">signup</Link>
                  </Nav.Link>
                </Nav.Item>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
}

export default NavigationBar;
