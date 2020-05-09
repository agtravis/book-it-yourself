import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Jumbotron,
  Container,
  Badge,
} from "react-bootstrap";
import Nav from "../Nav";
import "./style.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      role: "",
      loggedIn: false,
      redirect: null,
      usernameError: "",
      passwordError: "",
      emailError: "",
      roleError: "",
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event, roleName) => {
    if (event.target.checked) {
      this.setState({
        role: [...this.state.role, roleName],
      });
    } else {
      if (this.state.role.includes(roleName)) {
        const newRoles = [...this.state.role];
        newRoles.splice(newRoles.indexOf(roleName), 1);
        this.setState({ role: newRoles });
      }
    }
  };

  validate = userExists => {
    let usernameError = "";
    let passwordError = "";
    let emailError = "";
    let roleError = "";

    if (userExists) {
      usernameError = "username already in use";
    }

    if (this.state.username.length < 4) {
      usernameError = "four characters required";
    }

    if (this.state.username.includes(" ")) {
      usernameError = "cannot contain spaces";
    }

    if (this.state.password.length < 4) {
      passwordError = "four characters required";
    }

    if (this.state.password.includes(" ")) {
      passwordError = "cannot contain spaces";
    }

    if (this.state.email.length < 6) {
      emailError = "invalid email address";
    }

    if (this.state.email.includes(" ")) {
      emailError = "invalid email address";
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email address";
    }

    if (!this.state.email.includes(".")) {
      emailError = "invalid email address";
    }

    if (this.state.role === "") {
      roleError = "check at least one box";
    }

    if (usernameError || passwordError || emailError || roleError) {
      this.setState({ usernameError, passwordError, emailError, roleError });
      return false;
    }

    return true;
  };

  handleSubmit = event => {
    event.preventDefault();
    let userExists = false;
    axios.get("/api/users/", {}).then(response => {
      for (let i = 0; i < response.data.length; ++i) {
        if (this.state.username === response.data[i].username) {
          // eslint-disable-next-line no-unused-expressions
          userExists = true;
        }
      }
      if (this.validate(userExists) && !userExists) {
        axios
          .post("/api/user/", {
            username: this.state.username.toLowerCase(),
            password: this.state.password,
            location: this.state.location.toLowerCase(),
            telephone: this.state.telephone,
            email: this.state.email.toLowerCase(),
            role: this.state.role,
          })
          .then(response => {
            if (!response.data.errmsg) {
              this.setState({
                loggedIn: true,
                redirect: `/login`,
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="signupbg">
        <Nav />
        
        <Row className="justify-content-md-center">
        
          <Container className="signbadge">
            <h2 className="header">
              <Badge variant="dark">Sign Up:</Badge>
            </h2>
          </Container>
         
        </Row>
        <Row className="justify-content-md-center">
          <Jumbotron className="signcontain">
            <Container>
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Badge variant="dark">Username</Badge>
                    <Form.Control
                      type="text"
                      id="username"
                      name="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.usernameError}
                    </div>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Badge variant="dark">Password</Badge>
                    <Form.Control
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                    <div style={{ fontSize: 12, color: "red" }}>
                      {this.state.passwordError}
                    </div>
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Badge variant="dark">Email Address</Badge>
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.emailError}
                  </div>
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col}>
                    <Badge variant="dark">City</Badge>
                    <Form.Control
                      type="text"
                      id="location"
                      name="location"
                      value={this.state.location}
                      onChange={this.handleChange}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Badge variant="dark">Phone</Badge>
                    <Form.Control
                      type="text"
                      id="telephone"
                      name="telephone"
                      value={this.state.telephone}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                </Form.Row>

                <Form.Group>
                  <Badge variant="dark">
                    <Form.Check
                      inline
                      type="checkbox"
                      value="artist"
                      label="Artist"
                      onChange={event => this.handleCheck(event, `artist`)}
                    />
                  </Badge>
                  <Badge variant="dark">
                    <Form.Check
                      inline
                      type="checkbox"
                      value="promoter"
                      label="Promoter"
                      onChange={event => this.handleCheck(event, `promoter`)}
                    />
                  </Badge>
                  <div style={{ fontSize: 12, color: "red" }}>
                    {this.state.roleError}
                  </div>
                </Form.Group>

                <Button
                  variant="dark"
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Container>
          </Jumbotron>
        </Row>
      </div>
    );
  }
}

export default Signup;
