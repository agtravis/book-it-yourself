import React, { Component } from "react";
import { Jumbotron, Col } from "react-bootstrap";
import Nav from "../components/Nav";
import Search from "../components/Search";

class MobileSearch extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Jumbotron fluid>
          <Col xs={11} className="justify-content-center">
            <Search setSearchTerm={this.props.setSearchTerm} />
          </Col>
        </Jumbotron>
      </div>
    );
  }
}
export default MobileSearch;
