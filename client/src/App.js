import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import React from "react";
import Main from "./pages/Main";
import Index from "./pages/Index";
import ErrorNotFound from "./components/errornotfound";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route exact path="/main" component={Main} />
            <Route component={ErrorNotFound} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
