import React, { Component } from "react";
import Calendar from "react-calendar";
import Jumbotron from "react-bootstrap/Jumbotron";
import Nav from "../components/Nav";

class EventCalendar extends Component {
  state = {
    date: new Date(),
  };

  onChange = date => this.setState({ date });

  render() {
    return (
      <div>
          <Nav />
        <Jumbotron>
          <h5>Upcoming Events</h5>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </Jumbotron>
      </div>
    );
  }
}

export default EventCalendar;