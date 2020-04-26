import React, { Component } from "react";
import "./App.css";
import API from "./utils/API";

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
    return (
      <div>
        <h1>something</h1>
      </div>
    );
  }
}

export default App;
