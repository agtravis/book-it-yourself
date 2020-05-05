import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { InstantSearch } from "react-instantsearch-dom";
import { SearchBox } from "react-instantsearch-dom";
import { Hits } from "react-instantsearch-dom";

const hit = ({ hit }) => (
  <div className="hit">
    <div className="hitImage">
      <img src={hit.image} />
    </div>
  </div>
);
const Content = () => (
  <div className="content">
    <Hits hitComponent={hit} />
  </div>
);
function Search() {
  return (
    <InstantSearch
      appId="UDOLFJ7GFM"
      apiKey="b2ce42b70fbdb2904dcf85f8f2431640"
      indexName="prod_BIY"
    >
      <header>
        <SearchBox translations={{ placeholder: "Search Box" }} />
      </header>

      <main>
        <Content />
      </main>
    </InstantSearch>
  );
}

export default Search;
