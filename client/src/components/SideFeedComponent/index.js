import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import MapComponent from "../MapComponent";
import CalendarComponent from "../CalendarComponent";
import "./style.css"

function SideFeed() {
  return (
    <Jumbotron fluid className="sidebar">
      <Container>
        <CalendarComponent />
        <MapComponent />
      </Container>
    </Jumbotron>
  );
}

export default SideFeed;
