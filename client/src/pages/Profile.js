import React, { Component } from "react";
import { Row, Col, Jumbotron, Container } from "react-bootstrap";
import Nav from "../components/Nav";
import axios from "axios";
import localForage from "localforage";
import API from "../utils/API";
import ProfileComponent from "../components/ProfileComponent";
import SideFeedComponent from "../components/SideFeedComponent";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      user: {},
    };
  }

  componentDidMount = () => {
    this.getUser();
  };

  deletePost = (id, author) => {
    API.deletePost(id)
      .then(data => {
        API.updateRemoveUserPost(author, {
          id: data.data._id,
        })
          .then(data => {
            this.getUser();
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  };

  togglePostStatus = (id, status) => {
    let newStatus;
    if (status === `open`) {
      newStatus = true;
    } else if (status === `closed`) {
      newStatus = false;
    }
    API.updatePost(id, { complete: newStatus })
      .then(data => {
        this.getUser();
      })
      .catch(err => console.error(err));
  };

  updateUser = userObject => {
    this.setState(userObject);
  };

  editField = (id, property, value) => {
    if (property === `phone`) {
      property = `telephone`;
    }
    API.updateUser(id, { [property]: value })
      .then(data => {
        this.getUser();
      })
      .catch(err => console.error(err));
  };

  editRole = (id, role) => {
    API.updateUser(id, { role: role })
      .then(data => {
        this.getUser();
      })
      .catch(err => console.error(err));
  };

  getUser = () => {
    if (navigator.onLine) {
      axios.get("/api/user/").then(response => {
        if (response.data.user) {
          API.getUser(response.data.user._id)
            .then(user => {
              this.setState({
                user: {
                  id: user.data._id,
                  username: user.data.username,
                  location: user.data.location,
                  email: user.data.email,
                  telephone: user.data.telephone,
                  role: user.data.role,
                  status: user.data.status,
                  posts: user.data.posts,
                },
              });
            })
            .catch(err => console.error(err));

          this.setState({
            loggedIn: true,
            username: response.data.user.username,
            id: response.data.user._id,
          });
        } else {
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
          }
          if (value && value.loggedIn) {
            this.setState({
              loggedIn: value.loggedIn,
              username: value.username,
              id: value.id,
              user: {
                id: value.id,
                username: value.username,
              },
            });
          }
        })
        .catch(err => console.error(err));
    }
  };

  render() {
    return (
      <div>
        <Nav />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Jumbotron fluid>
              <Container className="maincontain">
                <div>
                  <ProfileComponent
                    deletePost={this.deletePost}
                    togglePostStatus={this.togglePostStatus}
                    editField={this.editField}
                    editRole={this.editRole}
                    userId={this.state.user.id}
                    username={this.state.user.username}
                    location={this.state.user.location}
                    email={this.state.user.email}
                    telephone={this.state.user.telephone}
                    status={this.state.user.status}
                    role={this.state.user.role}
                    posts={this.state.user.posts}
                  />
                </div>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
