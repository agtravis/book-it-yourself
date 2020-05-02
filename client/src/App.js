<<<<<<< HEAD
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import React from 'react';
import Main from './pages/Main';

//import Main from './pages/Main.js';

class App extends React.Component {

    render() {
        return(
        <Router>
            <div>
                <Nav />
                <Switch>
                <Route exact path="/" component={Main} />
                </Switch>
                <Footer />
            </div>
        </Router>
    );
}
}
export default App;
=======
import React, { Component } from 'react';
import axios from 'axios'
import { Route, Link } from 'react-router-dom'

// components
import Signup from './components/sign-up'
import LoginForm from './components/login-form'
import Navbar from './components/navbar'
import Home from './components/home'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Logged in as: {this.state.username}</p>
        }
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />
        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />

      </div>
    );
  }
}

export default App;
>>>>>>> db1c1326e2f73aa534afce593c761a1f059305da
