import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import API from "../../utils/API";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ``,
      users: [],
      redirect: null,
    };
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSubmit = event => {
    console.log(this.state.searchTerm);
    API.searchUser(this.state.searchTerm)
      .then(response => {
        console.log(response.data);
        // this.setState({ users: response.data, redirect: `/search` });
      })
      .catch(err => console.error(err));
  };

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return <Redirect to={redir} users={this.state.users} test={`test`} />;
    }
    return (
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          size="sm"
          placeholder="Search Users"
          className="mr-sm-2"
          onChange={event => this.handleSearchTermChange(event)}
        />
        <InputGroup.Append>
          <Button
            variant="outline-info"
            size="sm"
            onClick={event => this.handleSubmit()}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default Search;
