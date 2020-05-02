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
