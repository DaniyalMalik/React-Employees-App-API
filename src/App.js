import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './layouts/Routes';
import Employees from './components/crud/Employees';
import Details from './components/crud/Details';
import Add from './components/crud/Add';
import Edit from './components/crud/Edit';
import NotFound from './components/pages/NotFound';
import ResetPassword from './components/auth/ResetPassword';
import ForgotPassword from './components/auth/ForgotPassword';

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
            <Route
              exact
              path='/dashboard/details/:params_email/:id'
              component={Details}
            />
            <Route exact path='/resetpassword/:token' component={ResetPassword} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
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
