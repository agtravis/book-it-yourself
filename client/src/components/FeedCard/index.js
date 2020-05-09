import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./style.css";

class FeedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      id: ``,
      imgSrc: ``,
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?api_key=krsGO7xfBLF7bCmtRs7tpOLC0UjdzxcH&q=${this.props.location}`
      )
      .then(data => {
        const num = Math.floor(Math.random() * 20);
        this.setState({ imgSrc: data.data.data[num].images.fixed_width.url });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.redirect) {
      const redir = this.state.redirect;
      this.setState({ redirect: null });
      return (
        <Redirect
          to={{
            pathname: redir,
            state: {
              userID: this.state.id,
            },
          }}
        />
      );
    }

    const startDate = new Date(this.props.startDate);
    const endDate = new Date(this.props.endDate);

    return (
      <Card className="w-75 mb-3 mx-auto">
        <div class="row no-gutters">
          <div class="col-md-4">
            {this.state.imgSrc ? (
              <img src={this.state.imgSrc} class="card-img" alt="..." />
            ) : null}
          </div>
          <div class="col-md-8">
            <Card.Body>
              <h1>{this.props.title}</h1>
              {this.props.name ? (
                <button
                  className="btn btn-secondary btn-sm rounded"
                  onClick={() => {
                    this.setState({
                      redirect: `/userdetails`,
                      id: this.props.author,
                    });
                  }}
                >
                  {`Contact ${this.props.name}`}
                </button>
              ) : null}
              {this.props.delete ? (
                <button
                  className="btn btn-secondary btn-sm rounded mb-1"
                  onClick={() =>
                    this.props.deletePost(this.props.id, this.props.author)
                  }
                >
                  DELETE
                </button>
              ) : null}
              {this.props.delete && this.props.complete !== `negative` ? (
                <div>
                  <button
                    className="btn btn-secondary btn-sm rounded"
                    onClick={() =>
                      this.props.togglePostStatus(
                        this.props.id,
                        this.props.complete
                      )
                    }
                  >
                    TOGGLE STATUS
                  </button>
                  <p>Status: {this.props.complete}</p>
                </div>
              ) : null}
              <p>Location: {this.props.location}.</p>
              <p>
                When:{" "}
                {`${
                  startDate.getMonth() + 1
                }/${startDate.getDate()}/${startDate.getFullYear()}`}
                {this.props.endDate !== ``
                  ? ` until ${`${
                      endDate.getMonth() + 1
                    }/${endDate.getDate()}/${endDate.getFullYear()}`}`
                  : null}
                .
              </p>
              <p>Description: {this.props.description}</p>
            </Card.Body>
          </div>
        </div>
      </Card>
    );
  }
}

export default FeedCard;
