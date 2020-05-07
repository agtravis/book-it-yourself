import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import SideFeedComponent from "../SideFeedComponent";
import Nav from "../Nav";

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

  validate = (userExists) => {
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
    axios
      .get("/api/users/", {})
      .then(response => {
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
            console.log(response);
            if (!response.data.errmsg) {
              this.setState({
                loggedIn: true,
                redirect: `/login`,
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
        }
      }
    )
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <Nav />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Form>
              <h3>Create Account</h3>
              <Form.Group
                as={Row}
                controlId="formPlaintextUsername"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Username
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 10, color: "red" }}>
                    {this.state.usernameError}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintextPassword"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Password
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 10, color: "red" }}>
                    {this.state.passwordError}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintext"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  City
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    id="location"
                    name="location"
                    value={this.state.location}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formPlaintextTelephone"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Phone
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={this.state.telephone}
                    onChange={this.handleChange}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formBasicEmail"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Email
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  <div style={{ fontSize: 10, color: "red" }}>
                    {this.state.emailError}
                  </div>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                controlId="formBasicEmail"
                className="justify-content-center"
              >
                <Form.Label column sm="1">
                  Role
                </Form.Label>
                <Col sm="2">
                  <Form.Check
                    type="checkbox"
                    value="artist"
                    label="artist"
                    onChange={event => this.handleCheck(event, `artist`)}
                  />
                  <Form.Check
                    type="checkbox"
                    value="promoter"
                    label="promoter"
                    onChange={event => this.handleCheck(event, `promoter`)}
                  />
                  <div style={{ fontSize: 10, color: "red" }}>
                    {this.state.roleError}
                  </div>
                </Col>
              </Form.Group>

              <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Signup;