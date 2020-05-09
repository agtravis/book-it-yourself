import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import localForage from "localforage";
import { Nav, Navbar } from "react-bootstrap";
import Search from "../Search";
import "./style.css";
import Logo from "../../assets/images/logo.PNG";

class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      redirect: null,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    if (navigator.onLine) {
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
    } else {
      localForage
        .getItem(`userKey`)
        .then(value => {
          if (value && value.loggedIn) {
            this.setState({
              loggedIn: value.loggedIn,
              username: value.username,
              id: value.id,
            });
          }
        })
        .catch(err => console.error(err));
    }
  };

  logout = event => {
    event.preventDefault();
    axios
      .post("/api/user/logout")
      .then(response => {
        localForage.setItem(`userKey`, {
          loggedIn: false,
          username: null,
          id: null,
        });
        if (response.status === 200) {
          window.location.replace(`/`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  linkToPage = path => {
    this.setState({
      redirect: path,
    });
  };

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      if (this.state.redirect === "/search") {
        this.setState({ redirect: null });
        return (
          <Redirect
            to={{
              pathname: redir,
              state: {
                searchTerm: "search for users",
              },
            }}
          />
        );
      }
      this.setState({ redirect: null });
      return <Redirect to={redir} />;
    }
    if (this.state.loggedIn) {
      return (
        <Navbar
          collapseOnSelect
          className="fixed-top"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand href="/">
            <img
              src={Logo}
              width="75"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <React.Fragment>
              <Link
                className="d-block"
                onClick={() => {
                  this.linkToPage(`/profile`);
                }}
              >
                Profile
              </Link>
              <Link
                className="d-block"
                onClick={() => {
                  this.linkToPage(`/feed`);
                }}
              >
                Feed
              </Link>
              <Link
                className="d-block d-sm-none"
                onClick={() => {
                  this.linkToPage(`/mobilesearch`);
                }}
              >
                Search
              </Link>
              <Link
                className="d-block d-xl-none"
                onClick={() => {
                  this.linkToPage(`/calendar`);
                }}
              >
                Calendar
              </Link>
              <Link
                className="d-block d-xl-none"
                onClick={() => {
                  this.linkToPage(`/map`);
                }}
              >
                Map
              </Link>
              <Link className="d-block" to="/" onClick={this.logout}>
                Sign out
              </Link>
            </React.Fragment>
          </Navbar.Collapse>
          <div className=" d-none d-sm-block justify-content-end">
            <Search setSearchTerm={this.props.setSearchTerm} />
          </div>
        </Navbar>
      );
    } else {
      return (
<<<<<<< HEAD
        <Navbar
          collapseOnSelect
          className="fixed-top"
          expand="lg"
          bg="dark"
          variant="dark"
        >
=======
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
>>>>>>> f03fb907da704a7bc97e79319b4396e7bd63fda2
          <Navbar.Brand href="/">
            <img
              src={Logo}
              width="75"
              height="50"
              className="d-inline-block align-top"
              alt="logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <React.Fragment>
              <Nav.Link>
                <Link to="/login">Login</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signup">Signup</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/mobilesearch" className="d-block d-sm-none">
                  Search
                </Link>
              </Nav.Link>
            </React.Fragment>
          </Navbar.Collapse>
          <div className=" d-none d-sm-block justify-content-end">
            <Search setSearchTerm={this.props.setSearchTerm} />
          </div>
        </Navbar>
      );
    }
  }
}

export default NavigationBar;
