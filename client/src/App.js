import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import React from "react";
import axios from "axios";
import Login from "./components/LoginForm";
import Main from "./pages/Main";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import FeedComponent from "./components/FeedComponent";
import SideFeedComponent from "./components/SideFeedComponent";
import { Row, Col } from "react-bootstrap";
import SignupForm from "./components/SignupForm";
import Search from "./pages/Search";
import API from "./utils/API";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: null,
      id: null,
    };
  }

  componentDidMount() {
    this.getUser();
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
  };

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/feed" component={FeedComponent} />
            <Route component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
}
export default App;
