import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import { Jumbotron, Row, Col } from "react-bootstrap";
import SideFeedComponent from "../components/SideFeedComponent";
import API from "../utils/API";

class MakePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      type: ``,
      title: ``,
      author: ``,
      name: ``,
      description: ``,
      location: ``,
      startDate: ``,
      endDate: ``,
      success: false,
    };
  }

  componentDidMount() {
    this.getUser();
  }

  handleSubmit = event => {
    event.preventDefault();
    if (
      !this.state.type ||
      !this.state.title ||
      !this.state.description ||
      !this.state.location ||
      !this.state.startDate ||
      !this.state.endDate ||
      !this.state.author ||
      !this.state.name
    ) {
      alert(`Finish the form!`);
    } else {
      API.addPost({
        type: this.state.type,
        title: this.state.title,
        description: this.state.description,
        location: this.state.location,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        author: this.state.author,
        name: this.state.name,
      })
        .then(postDb => {
          API.updateUserNewPost(this.state.id, {
            id: postDb.data._id,
          })
            .then(userDB => {
              console.log(userDB);
              this.setState({
                type: ``,
                title: ``,
                description: ``,
                location: ``,
                startDate: ``,
                endDate: ``,
                success: true,
              });
              document.getElementById(`type`).value = ``;
              document.getElementById(`title`).value = ``;
              document.getElementById(`description`).value = ``;
              document.getElementById(`location`).value = ``;
              document.getElementById(`startDate`).value = ``;
            })
            .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    }
  };

  getUser = () => {
    axios.get("/api/user/").then(response => {
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
          author: response.data.user._id,
          name: response.data.user.username,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          username: null,
          id: null,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <Nav /*updateUser={this.updateUser} loggedIn={this.state.loggedIn}*/ />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <h1>Make a Post</h1>
            <form onSubmit={event => this.handleSubmit(event)}>
              <p>What kind of post are you making?</p>
              <select
                id="type"
                name="typelist"
                onChange={event =>
                  this.setState({
                    type: event.target.value,
                    success: false,
                  })
                }
              >
                <option value="">Choose:</option>
                <option value="artistNeeded">
                  Promoter looking for an artist
                </option>
                <option value="showNeeded">Artist looking for a show</option>
              </select>
              <p>A title for your post:</p>
              <input
                id="title"
                onChange={event => this.setState({ title: event.target.value })}
              />
              <p>Details please!:</p>
              <textarea
                id="description"
                onChange={event =>
                  this.setState({ description: event.target.value })
                }
              ></textarea>
              <p>Where is this going down?:</p>
              <input
                id="location"
                onChange={event =>
                  this.setState({ location: event.target.value })
                }
              />
              <p>When, baby?:</p>
              <p>From:</p>
              <input
                type="date"
                id="startDate"
                onChange={event =>
                  this.setState({ startDate: event.target.value })
                }
              />
              {this.state.startDate ? (
                <div>
                  <p>Until:</p>
                  <input
                    type="date"
                    id="endDate"
                    onChange={event =>
                      this.setState({ endDate: event.target.value })
                    }
                  />
                </div>
              ) : null}
              <button type="submit">Submit</button>
              {this.state.success ? <h1>Posted!</h1> : null}
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MakePost;
