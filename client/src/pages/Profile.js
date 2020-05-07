import React, { Component } from "react";
import { Row, Col, Jumbotron, Container } from "react-bootstrap";
import Nav from "../components/Nav";
import axios from "axios";
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

  updateUser = userObject => {
    this.setState(userObject);
  };

  getUser = () => {
    axios.get("/api/user/").then(response => {
      console.log("Get user response: ");
      console.log(response.data);
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
        console.log("Get User: There is a user saved in the server session: ");

        this.setState({
          loggedIn: true,
          username: response.data.user.username,
          id: response.data.user._id,
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
        <Nav />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <Jumbotron fluid>
              <Container>
                {/* {this.state.user.username !== undefined ? ( */}
                <div>
                  <ProfileComponent
                    username={this.state.user.username}
                    location={this.state.user.location}
                    email={this.state.user.email}
                    telephone={this.state.user.telephone}
                    status={this.state.user.status}
                    role={this.state.user.role}
                    posts={this.state.user.posts}
                  />
                </div>
                {/* ) : null} */}
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
