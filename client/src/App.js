import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import React from "react";
import axios from "axios";
import Login from "./components/LoginForm";
import Main from "./pages/Main";
import Home from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import FeedComponent from "./components/NameCard";
import SideFeedComponent from "./components/SideFeedComponent";
import { Row, Col } from "react-bootstrap";

class App extends React.Component {
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
        <Router>
          <Nav
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            username={this.state.username}
          />
          <div>
            <Row>
              <Col sm={4}>
                <SideFeedComponent />
              </Col>
              <Col sm={8} xs={12}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={Index}
                    loggedIn={this.state.loggedIn}
                    username={this.state.username}
                  />
                  <Route
                    exact
                    path="/login"
                    component={Login}
                    updateUser={this.updateUser}
                  />
                  <Route exact path="/main" component={Main} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/feed" component={FeedComponent} />
                  <Route component={NotFound} />
                </Switch>
              </Col>
            </Row>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
