import React from "react";
import { Jumbotron, Badge, Row, Col } from "react-bootstrap";
import MapTest from "../../assets/images/mapTest.jpg";
import "./style.css"

function Map() {
  return (
    <Jumbotron className="maptron">
        <h5 className="maptron" style={{ textAlign: "center" }}>Event Locator</h5>
        <img
          src={MapTest}
          style={{ maxWidth: 375 }}
          className="d-inline-block align-top"
          alt="logo"
        />
    </Jumbotron>
  );
}

export default Map;
