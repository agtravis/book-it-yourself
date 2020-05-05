import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
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
      confirmPassword: "",
      loggedIn: false,
      redirect: null,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = event => {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/api/user/", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log(response);
        if (!response.data.errmsg) {
          console.log("successful signup");
          this.setState({
            loggedIn: true,
            redirect: `/login`,
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
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
                </Col>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

      // (window.location.href = "/login")
      // this.props.router.push(`/login`)
    );
  }
}

export default Signup;
