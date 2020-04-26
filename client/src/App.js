import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";

import MockUp from "./MockUp/MockUp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    API.getUsers()
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return <MockUp users={this.state.users} getUsers={this.getUsers} />;
  }
}

export default App;
