import React, { Component } from "react";
import Cassette from "../img/cassette.png";
export default class ErrorNotFound extends Component {
  render() {
    return (
      <div id="error">
        <img src={Cassette} />
        <h1 className="notFoundTitle">Yo! That page can’t be found!</h1>
        <p className="notFoundDesc">
          It looks like nothing was found at this location. Maybe try one of the
          links in the menu or press back to go to the previous page.
        </p>
      </div>
    );
  }
}
