import React from "react";
import SideFeedComponent from "../components/SideFeedComponent";
import Nav from "../components/Nav";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
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
      console.log(response.data);
      if (response.data.user) {
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
        <Nav updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        <Row>
          <Col xl={4}>
            <div className="d-none d-xl-block">
              <SideFeedComponent />
            </div>
          </Col>
          <Col xl={8}>
            <div>
              {this.state.loggedIn && <p>Welcome {this.state.username} !</p>}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;
