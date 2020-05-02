import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import MapComponent from "../MapComponent";
import CalendarComponent from "../CalendarComponent";

function SideFeed() {
  return (
    <Jumbotron fluid className="d-none d-sm-block">
      <Container>
        <CalendarComponent />
        <MapComponent />
      </Container>
    </Jumbotron>
  );
}

export default SideFeed;
