import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

function Search() {
  return (
    <InputGroup className="mb-3">
      <FormControl
        type="text"
        size="sm"
        placeholder="Search"
        className="mr-sm-2"
      />
      <InputGroup.Append>
        <Button variant="outline-info" size="sm">
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default Search;
