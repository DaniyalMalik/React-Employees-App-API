import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Employees from './components/crud/Employees';
import Details from './components/crud/Details';
import Add from './components/crud/Add';
import Edit from './components/crud/Edit';
import NotFound from './components/pages/NotFound';
import ResetPassword from './components/auth/ResetPassword';
import ForgotPassword from './components/auth/ForgotPassword';
import ProtectedRoute from 'react-protected-route-component';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import VerifyEmail from './components/auth/VerifyEmail';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route
              exact
              path='/resetpassword/:token'
              component={ResetPassword}
            />
            <Route exact path='/verifyemail/:email' component={VerifyEmail} />
            <Route exact path='/forgotpassword' component={ForgotPassword} />
            <ProtectedRoute
              path='/dashboard/:params_email'
              redirectRoute='/'
              guardFunction={() => {
                if (localStorage.getItem('token')) {
                  return true;
                } else {
                  return false;
                }
              }}
              component={Employees}
              exact
            />
            <ProtectedRoute
              path='/dashboard/details/:params_email/:id'
              redirectRoute='/'
              guardFunction={() => {
                if (localStorage.getItem('token')) {
                  return true;
                } else {
                  return false;
                }
              }}
              component={Details}
              exact
            />
            <ProtectedRoute
              path='/dashboard/:params_email/add'
              redirectRoute='/'
              guardFunction={() => {
                if (localStorage.getItem('token')) {
                  return true;
                } else {
                  return false;
                }
              }}
              component={Add}
              exact
            />
            <ProtectedRoute
              path='/dashboard/edit/:params_email/:id'
              redirectRoute='/'
              guardFunction={() => {
                if (localStorage.getItem('token')) {
                  return true;
                } else {
                  return false;
                }
              }}
              component={Edit}
              exact
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}
