import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import { Nav, Navbar } from "react-bootstrap";
import Home from "../../pages/Index";
import Search from "../Search";
import "./style.css";
import Logo from "../../assets/images/logo.PNG";

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
  };

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
        <Navbar
          collapseOnSelect
          className="fixed-top"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand>
            <img
              src={Logo}
              width="75"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="/">Book it Yourself</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            {loggedIn ? (
              <React.Fragment>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/main">Feed</Nav.Link>
                <Nav.Link className="d-block d-sm-none" to="/search">
                  Search
                </Nav.Link>
                <Nav.Link className="d-block d-sm-none" href="/calendar">
                  Calendar
                </Nav.Link>
                <Nav.Link className="d-block d-sm-none" href="/map">
                  Map
                </Nav.Link>
                <Nav.Link to="/" onClick={this.logout}>
                  Sign out
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link>
                  <Link to="/login">Login</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/signup">Signup</Link>
                </Nav.Link>
              </React.Fragment>
            )}
          </Navbar.Collapse>
          <div className=" d-none d-sm-block justify-content-end">
            <Search />
          </div>
        </Navbar>
      );
    }
  }
}

export default NavigationBar;
