import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Row, Col, Jumbotron, Badge, ListGroup } from "react-bootstrap";
import Nav from "../components/Nav";
import API from "../utils/API";
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
          this.setState({ users: response.data });
        })
        .catch(err => console.error(err));
    } else {
      API.searchUser(this.props.location.state.searchTerm)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(err => console.error(err));
    }
  };

  render() {
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
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Jumbotron className="searchreshead" fluid>
              <Badge variant="dark">
                <h2>Search Results</h2>
              </Badge>
              <ListGroup>
                {this.state.users.length > 0
                  ? this.state.users.map(user => (
                      <ListGroup.Item
                        variant="dark"
                        action
                        onClick={event => {
                          this.handleUserChoice(event.target.id);
                        }}
                      >
                        <a>{user.username}</a>
                      </ListGroup.Item>
                    ))
                  : null}
              </ListGroup>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;
