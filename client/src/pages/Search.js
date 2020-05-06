import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Row, Col, Jumbotron, Container, Image } from "react-bootstrap";
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
    this.state = {};
  }

  componentDidMount() {
    this.setSearchTerm();
  }

  setSearchTerm = () => {
    API.searchUser(this.props.location.state.searchTerm)
      .then(response => {
        console.log(response.data);
      })
      .catch(err => console.error(err));
  };

  render() {
    // console.log(this.props.location.pathname);

    return (
      <div>
        <Nav />
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8} xs={12}>
            <Jumbotron fluid>
              <p>search page</p>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
