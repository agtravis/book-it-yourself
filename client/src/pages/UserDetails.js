import React, { Component } from "react";
import { Row, Col, Jumbotron, Container } from "react-bootstrap";
import Nav from "../components/Nav";
import axios from "axios";
import ProfileComponent from "../components/ProfileComponent";
import SideFeedComponent from "../components/SideFeedComponent";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
      user: {},
      userID: "",
    };
  }

  componentDidMount = () => {
    this.getUser();
  };

  updateUser = userObject => {
    this.setState(userObject);
  };

  getUser = () => {
    console.log(this.props.location.state.userID);
    axios
      .get(`/api/user/${this.props.location.state.userID}`)
      .then(response => {
        console.log("Get user response: ");
        console.log(response.data);
        this.setState({
          user: {
            id: response.data._id,
            username: response.data.username,
            location: response.data.location,
            email: response.data.email,
            telephone: response.data.telephone,
            role: response.data.role,
            status: response.data.status,
            posts: response.data.posts,
          },
        });
      })
      .catch(err => console.error(err));
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
