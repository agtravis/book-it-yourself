import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
import FeedComponent from "../components/FeedComponent";
import SideFeedComponent from "../components/SideFeedComponent";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Navbar from "../components/Nav";
import Profile from "../pages/Profile";
import Home from "../pages/Index";
import axios from 'axios';

class Main extends React.Component {
    constructor() {
        super()
        this.state = {
          loggedIn: false,
          username: null,
          id: null,
        };
      }
    
      componentDidMount = () => {
        this.getUser();
      }
    
      updateUser = userObject => {
        this.setState(userObject);
      }
    
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
      }

  render() {
    return (
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <div>
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn}/>
        {this.state.loggedIn && <p>Welcome {this.state.username} !</p>}
        <Row>
          <Col sm={4}>
            <SideFeedComponent />
          </Col>
          <Col sm={8}xs={12}>
            <FeedComponent />
          </Col>
        </Row>
      </div>
      </Switch>
      </Router>
    );
  }
}

export default Main;
