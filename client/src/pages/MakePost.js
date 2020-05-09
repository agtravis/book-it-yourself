import React, { Component } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import {
  Button,
  Jumbotron,
  Row,
  Col,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import SideFeedComponent from "../components/SideFeedComponent";
import API from "../utils/API";
import localForage from "localforage";

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
      offlineSuccess: false,
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
      if (navigator.onLine) {
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
      } else {
        const postObj = {
          post: {
            type: this.state.type,
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            author: this.state.author,
            name: this.state.name,
          },
          user: this.state.id,
        };
        const postArr = [];
        localForage
          .getItem("postKey")
          .then(value => {
            postArr.push(postObj);
            if (value && value.length > 0) {
              for (const post of value) {
                postArr.push(post);
              }
            }
            localForage
              .setItem(`postKey`, postArr)
              .then(value => {
                console.log(`localForage success - post stored offline!`);
                this.setState({ offlineSuccess: true });
                console.log(value);
              })
              .catch(err => console.error(err));
          })
          .catch(err => console.error(err));
      }
    }
  };

  getUser = () => {
    if (navigator.onLine) {
      axios.get("/api/user/").then(response => {
        console.log(response.data);
        if (response.data.user) {
          console.log(
            "Get User: There is a user saved in the server session: "
          );
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
    } else {
      localForage
        .getItem(`userKey`)
        .then(value => {
          if (value) {
            console.log(`userKey value:`);
            console.log(value);
          }
          if (value && value.loggedIn) {
            this.setState({
              loggedIn: value.loggedIn,
              username: value.username,
              id: value.id,
              author: value.id,
              name: value.username,
            });
          }
        })
        .catch(err => console.error(err));
    }
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
            <Jumbotron className="maincontain">
              <Container>
                <Form onSubmit={event => this.handleSubmit(event)}>
                  <Form.Row>
                    <Form.Group as={Col}>
                      <Form.Control
                        placeholder="Title"
                        id="title"
                        onChange={event =>
                          this.setState({ title: event.target.value })
                        }
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Form.Control
                        as="select"
                        id="type"
                        name="typelist"
                        onChange={event =>
                          this.setState({
                            type: event.target.value,
                            success: false,
                            offlineSuccess: false,
                          })
                        }
                      >
                        <option>Looking for :</option>
                        <option value={`artistNeeded`}>artist</option>
                        <option value={`promoterNeeded`}>promoter</option>
                        <option value={`showNeeded`}>show</option>
                      </Form.Control>
                    </Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Message</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="textarea"
                        id="description"
                        onChange={event =>
                          this.setState({ description: event.target.value })
                        }
                      />
                    </InputGroup>
                    <Form.Group>
                      <Form.Label></Form.Label>
                      <Form.Control
                        placeholder="Location"
                        id="location"
                        onChange={event =>
                          this.setState({ location: event.target.value })
                        }
                      ></Form.Control>
                    </Form.Group>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          {this.state.startDate ? `From` : `When`}
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="date"
                        id="startDate"
                        onChange={event =>
                          this.setState({ startDate: event.target.value })
                        }
                      ></Form.Control>
                      {this.state.startDate ? (
                        <>
                          <InputGroup.Prepend>
                            <InputGroup.Text>To</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type="date"
                            id="endDate"
                            onChange={event =>
                              this.setState({ endDate: event.target.value })
                            }
                          ></Form.Control>{" "}
                        </>
                      ) : null}
                      <Button
                        variant="dark"
                        type="submit"
                        onClick={this.handleSubmit}
                      >
                        Submit
                      </Button>
                    </InputGroup>
                    {this.state.success ? <h5>Posted!</h5> : null}
                    {this.state.offlineSuccess ? (
                      <div>
                        <h5>Posted in offline mode!</h5>
                        <p>
                          (Offline posts will be collectively resubmitted on
                          reconnection on any page.)
                        </p>
                      </div>
                    ) : null}
                  </Form.Row>
                </Form>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}
export default MakePost;
