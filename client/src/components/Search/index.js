import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ``,
      redirect: null,
    };
  }

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
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
              searchTerm: this.state.searchTerm,
            },
          }}
        />
      );
    }
    return (
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          size="sm"
          placeholder="Search Users"
          className="mr-sm-2"
          onChange={event => {
            this.handleSearchTermChange(event);
          }}
          onKeyUp={event => {
            if (event.keyCode === 13) {
              if (window.location.pathname === `/search`) {
                this.props.setSearchTerm(this.state.searchTerm);
              } else {
                this.setState({ redirect: `/search` });
              }
            }
          }}
        />
        <InputGroup.Append>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => {
              if (window.location.pathname === `/search`) {
                console.log(`matches`);
                this.props.setSearchTerm(this.state.searchTerm);
              } else {
                this.setState({ redirect: `/search` });
              }
            }}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

export default Search;
