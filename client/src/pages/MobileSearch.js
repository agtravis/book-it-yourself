import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import Nav from "../components/Nav";
import Search from "../components/Search";

class MobileSearch extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Jumbotron fluid>
          <div className=" justify-content-end">
            <Search setSearchTerm={this.props.setSearchTerm} />
          </div>
        </Jumbotron>
      </div>
    );
  }
}
export default MobileSearch;
