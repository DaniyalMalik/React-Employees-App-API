import React, { Component } from 'react';
import Routes from './components/Routes';
import Employees from './components/Employees';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Details from './components/Details';
import Add from './components/Add';
import Edit from './components/Edit';
import NotFound from './components/NotFound';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Routes} />;
            <Route
              exact
              path='/dashboard/:params_email'
              component={Employees}
            />
            ;
            <Route
              exact
              path='/dashboard/details/:params_email/:id'
              component={Details}
            />
            <Route exact path='/dashboard/:params_email/add' component={Add} />
            <Route
              exact
              path='/dashboard/edit/:params_email/:id'
              component={Edit}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}
