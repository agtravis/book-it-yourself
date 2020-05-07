import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "../components/Nav";
import MapTest from "../assets/images/mapTest.jpg";

function Map() {
  return (
    <div>
      <Nav />
      <Jumbotron fluid>
        <div>
          <h5>Event Locator</h5>
          <img
            src={MapTest}
            style={{ maxWidth: 375 }}
            className="d-inline-block align-top"
            alt="logo"
          />
        </div>
      </Jumbotron>
    </div>
  );
}

export default Map;