import React, { Component } from 'react';
import Login from './Login';
import Register from './Register';

export default class Routes extends Component {
  render() {
    return (
      <div class='mt-5'>
        <div className='container'>
          <ul class='nav nav-tabs' role='tablist'>
            <li class='nav-item'>
              <a class='nav-link active' data-toggle='tab' href='#login'>
                Login
              </a>
            </li>
            <li class='nav-item'>
              <a class='nav-link' data-toggle='tab' href='#register'>
                Register
              </a>
            </li>
          </ul>
        </div>
        <div class='tab-content'>
          <div id='login' class='container tab-pane active'>
            <Login />
          </div>
          <div id='register' class='container tab-pane fade'>
            <Register />
          </div>
        </div>
      </div>
    );
  }
}
