import React, { Component } from "react";
import Calendar from "react-calendar";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./style.css";

class EventCalendar extends Component {
  state = {
    date: new Date(),
  };

  onChange = date => this.setState({ date });

  render() {
    return (
      <div>
        <Jumbotron className="caltron">
          <h5 className="caltron" style={{ textAlign: "center" }}>Upcoming Events</h5>
          <Calendar onChange={this.onChange} value={this.state.date} />
        </Jumbotron>
      </div>
    );
  }
}

export default EventCalendar;
