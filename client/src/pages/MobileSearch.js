import React, { Component } from "react";
import { Jumbotron, Col, Row, Badge } from "react-bootstrap";
import Nav from "../components/Nav";
import Search from "../components/Search";

class MobileSearch extends Component {
  render() {
    return (
      <div className="searchbg">
        <Nav />
        <Row className="justify-content-md-center">
          <Jumbotron className="searchcontain" fluid>
            <Col xs={11} className="justify-content-center">
              <h2 className="searchheader">
                <Badge variant="dark">Search Users</Badge>
              </h2>
              <Search setSearchTerm={this.props.setSearchTerm} />
            </Col>
          </Jumbotron>
        </Row>
      </div>
    );
  }
}
export default MobileSearch;
