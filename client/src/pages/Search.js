import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Jumbotron, Button, Container, Image } from "react-bootstrap";
import Nav from "../components/Nav";
import axios from "axios";
import Main from "../pages/Main";
import Home from "../pages/Index";
import API from "../utils/API";
import image from "../assets/images/userTest.png";
import ProfileComponent from "../components/ProfileComponent";
import SideFeedComponent from "../components/SideFeedComponent";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      redirect: null,
      username: null,
      userID: null,
    };
  }

  componentDidMount() {
    this.setSearchTerm();
  }
  handleUserChoice = chosenUser => {
    this.setState({
      redirect: `/userdetails`,
      userID: chosenUser,
    });
  };

  setSearchTerm = search => {
    if (search) {
      API.searchUser(search)
        .then(response => {
          console.log(response.data);
          this.setState({ users: response.data });
        })
        .catch(err => console.error(err));
    } else {
      API.searchUser(this.props.location.state.searchTerm)
        .then(response => {
          console.log(response.data);
          this.setState({ users: response.data });
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    // console.log(this.props.location.pathname);
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return (
        <Redirect
          to={{
            pathname: redir,
            state: {
              userID: this.state.userID,
            },
          }}
        />
      );
    }

    return (
      <div>
        <Nav setSearchTerm={this.setSearchTerm} />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <Jumbotron fluid>
              <p>search page</p>
              {this.state.users.length > 0
                ? this.state.users.map(user => (
                    <p
                      id={user._id}
                      onClick={event => {
                        this.handleUserChoice(event.target.id);
                      }}
                    >
                      {user.username}
                    </p>
                  ))
                : null}
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
