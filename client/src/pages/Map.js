import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "../components/Nav";
import MapTest from "../assets/images/mapTest.jpg";
import "./style.css"

function Map() {
  return (
    <div>
      <Nav />
      <Jumbotron className="mobilemaptron" fluid>
        <div>
          <h5 className="mobilemaptron" >Event Locator</h5>
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