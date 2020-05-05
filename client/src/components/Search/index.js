import React from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { SearchBox } from "react-instantsearch-dom";
import { Hits } from "react-instantsearch-dom";
import { Highlight } from "react-instantsearch-dom";

/*eslint-disable*/

const Hit = ({ hit }) => (
  <div className="hit">
    <div className="hitImage">
      <img src={hit.image} />
    </div>
    <div className="hitName">
      <Highlight attribute="name" hit={hit} />
    </div>
  </div>
);

const Content = () => (
  <div className="content">
    <Hits hitComponent={Hit} />
  </div>
);

class App extends Component {
  render() {
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
}

export default App;
