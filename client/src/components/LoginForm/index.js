import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Main from "../../pages/Main";
import "./style.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      redirectTo: null,
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("/api/user/login", {
        username: this.state.username,
        password: this.state.password,
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          console.log(`user data incoming...`);
          console.log(response.data);
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            id: response.data.id,
          });
          this.setState({
            redirectTo: "/main",
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return (
        <Redirect
          to={{ pathname: this.state.redirectTo }}
          render={() => <Main />}
        />
      );
    } else {

       return (
          <div>
            <h3>Login Page</h3>
            <Form>
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
                value={this.state.password}
                onChange={this.handleChange}
              >
                <Form.Label column sm="1">
                  Password
                </Form.Label>
                <Col sm="2">
                  <Form.Control
                    type="password"
                    name="password"
                  />
                </Col>
              </Form.Group>
              <Button variant="dark" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
            </Form>
          </div>
       )
    };
  }
}
  
export default LoginForm;
