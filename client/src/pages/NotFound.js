import React, { Component } from "react";
import Cassette from "../assets/images/cassette.png";
import Jumbotron from "react-bootstrap/Jumbotron"
export default class ErrorNotFound extends Component {
  render() {
    return (
      <Jumbotron fluid>
      <div id="error">
        <img alt="404" src={Cassette} />
        <h1 className="notFoundTitle">Yo! That page can’t be found!</h1>
        <p className="notFoundDesc">
          It looks like nothing was found at this location. Maybe try one of the
          links in the menu or press back to go to the previous page.
        </p>
      </div>
      </Jumbotron>
    );
  }
}
