import React from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import AddUser from "./AddUser";
import AddPost from "./AddPost";

function MockUp(props) {
  return (
    <Router>
      <div>
        <h1>Mock up</h1>
      </div>
      <div>
        <Link to="/adduser">
          <p>Add User</p>
        </Link>
        <Link to="/addpost">
          <p>Add Post</p>
        </Link>
      </div>
      <Switch>
        <Route
          exact
          path="/adduser"
          render={() => (
            <AddUser getUsers={props.getUsers} users={props.users} />
          )}
        />
        <Route
          exact
          path="/addpost"
          render={() => (
            <AddPost getUsers={props.getUsers} users={props.users} />
          )}
        />
      </Switch>
    </Router>
  );
}

export default MockUp;