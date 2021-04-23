import React, { Component } from 'react';
import Routes from './components/Routes';
import Info from './components/Info';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Details from './components/Details';
import Login from './components/Login';
import Register from './components/Register';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Routes} />;
            <Route exact path='/dashboard/:params_email' component={Info} />;
            <Route
              exact
              path='/dashboard/details/:params_email/:id'
              component={Details}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
