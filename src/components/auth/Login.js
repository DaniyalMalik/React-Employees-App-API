import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onchange = () => {
    let email = document.getElementById('emailL').value;
    let password = document.getElementById('passwordL').value;
    this.setState({ email, password });
  };

  onLogin = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const user = { name, email, password };
    const baseUrl =
      process.env.REACT_APP_BASE_URL_LOCAL ||
      process.env.REACT_APP_BASE_URL_PROD;
    const res = await axios.post(`${baseUrl}/api/auth/login`, user);

    if (!res.data.success) {
      return swal('Greetings', res.data.message, 'error');
    }

    const token = res.data.token;

    localStorage.setItem('token', token);
    swal('Greetings', res.data.message, 'success');
    this.props.history.push(`/dashboard/${email}`);
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className='container mt-5'>
        <div className='card'>
          <div className='card-header'>
            <h3>Login Form</h3>
          </div>
          <div className='card-body'>
            <form action='' method='post' onSubmit={this.onLogin}>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Email</span>
                </div>
                <input
                  onChange={this.onchange}
                  type='email'
                  id='emailL'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  className='form-control'
                  required
                />
              </div>
              <div className='input-group mb-1'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Password</span>
                </div>
                <input
                  onChange={this.onchange}
                  type='password'
                  id='passwordL'
                  value={password}
                  name='password'
                  placeholder='Enter Password'
                  className='form-control'
                  required
                />
              </div>
              <div
                className='mb-1'
                style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={'/forgotpassword'} className='btn btn-link'>
                  Forgot Password?
                </Link>
              </div>
              <input
                type='submit'
                className='btn btn-success btn-block'
                name='submit'
                value='Login'
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
