import React, { Component } from "react";
import { Form, Button, Row, Col, Jumbotron, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Nav from "../Nav";
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      redirect: null,
      loginError: "",
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  validate = NoMatch => {
    let loginError = "";
    if (NoMatch) {
      loginError = "invalid credentials";
    }
    if (loginError) {
      this.setState({ loginError });
      return false;
    }
    return true;
  };
  handleSubmit = event => {
    event.preventDefault();
    let NoMatch = true;
    axios.get("/api/users/", {}).then(response => {
      for (let i = 0; i < response.data.length; ++i) {
        if (this.state.username === response.data[i].username) {
          NoMatch = false;
        }
      }
      if (this.validate(NoMatch) && !NoMatch) {
        axios
          .post("/api/user/login", {
            username: this.state.username.toLowerCase(),
            password: this.state.password,
          })
          .then(response => {
            if (response.status === 200) {
              this.setState({
                loggedIn: true,
                redirect: `/feed`,
              });
            }
          })
          .catch(error => {
            console.error(error);
            alert("invalid credentials");
          });
      }
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
          <Col xl={12}>
            <h5 className="text-center">Login</h5>
            <Jumbotron className="maincontain">
              <Container>
                <Form>
                  <Form.Row>
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <div style={{ fontSize: 10, color: "red" }}>
                        {this.state.loginError}
                      </div>
                    </Form.Group>
                  </Form.Row>
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
          </Col>
        </Row>
      </div>
    );
  }
}
export default LoginForm;
