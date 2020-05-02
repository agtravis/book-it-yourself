import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import MapTest from "../../assets/images/mapTest.jpg";

function Map() {
  return (
    <Jumbotron>
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
  );
}

export default Map;
