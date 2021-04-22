import React, { Component } from 'react';
import Routes from './components/Routes';
import Info from './components/Info';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Routes} />;
            <Route exact path='/dashboard/:params_email' component={Info} />;
          </Switch>
        </Router>
      </div>
    );
  }
}
