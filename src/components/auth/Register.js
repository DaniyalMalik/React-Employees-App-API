import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    repeat_password: '',
  };

  onchange = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeat_password = document.getElementById('repeat-password').value;

    this.setState({ name, email, password, repeat_password });
  };

  onRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, repeat_password } = this.state;
    const user = { name, email, password };

    if (password === repeat_password) {
      const baseUrl =
        process.env.REACT_APP_BASE_URL_LOCAL ||
        process.env.REACT_APP_BASE_URL_PROD;
      const res = await axios.post(`${baseUrl}/api/auth/register`, user);

      if (!res.data.success) {
        return swal('Greetings', res.data.message, 'error');
      }

      const token = res.data.token;

      localStorage.setItem('token', token);
      swal('Greetings', res.data.message, 'success');
      this.props.history.push(`/dashboard/${email}`);
    } else {
      return swal('Greetings', 'Passwords Not Match!', 'error');
    }
  };

  render() {
    const { name, email, password, repeat_password } = this.state;

    return (
      <div className='container mt-5'>
        <div className='card'>
          <div className='card-header'>
            <h3>Register Form</h3>
          </div>
          <div className='card-body'>
            <form action='' method='post' onSubmit={this.onRegister}>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Name</span>
                </div>
                <input
                  onChange={this.onchange}
                  type='text'
                  id='name'
                  placeholder='Enter Name'
                  name='name'
                  value={name}
                  className='form-control'
                  required
                />
              </div>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Email</span>
                </div>
                <input
                  onChange={this.onchange}
                  type='email'
                  id='email'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  className='form-control'
                  required
                />
              </div>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Password</span>
                </div>
                <input
                  onChange={this.onchange}
                  type='password'
                  id='password'
                  value={password}
                  name='password'
                  placeholder='Enter Password'
                  className='form-control'
                  required
                />
              </div>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Repeat Password</span>
                </div>
                <input
                  type='password'
                  value={repeat_password}
                  id='repeat-password'
                  name='repeat-password'
                  onChange={this.onchange}
                  placeholder='Repeat Password'
                  className='form-control'
                  required
                />
              </div>
              <input
                type='submit'
                className='btn btn-success btn-block'
                name='submit'
                value='Register'
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
