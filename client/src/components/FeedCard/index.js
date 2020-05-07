import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import API from "../../utils/API";

class FeedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Jumbotron>
        <Card style={{ width: "auto" }}>
          <Card.Body>
            <h1>{this.props.title}</h1>
            {this.props.delete ? (
              <button
                onClick={() =>
                  this.props.deletePost(this.props.id, this.props.author)
                }
              >
                DELETE
              </button>
            ) : null}
            {this.props.complete !== `negative` ? (
              <div>
                <button>TOGGLE STATUS</button>
                <p>Status: {this.props.complete}</p>
              </div>
            ) : null}
            <p>Location: {this.props.location}.</p>
            <p>
              When: {new Date(this.props.startDate).toString()}
              {this.props.endDate !== ``
                ? ` until ${new Date(this.props.endDate).toString()}`
                : null}
              .
            </p>
            <p>Description: {this.props.description}</p>
          </Card.Body>
        </Card>
      </Jumbotron>
    );
  }
}

export default FeedCard;
