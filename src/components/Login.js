import React, { Component } from 'react';
import swal from 'sweetalert';
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

  onlogin = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    let valid = false,
      users = localStorage.getItem('users');
    users = JSON.parse(users);
    for (let i = 0; i < users.length; i++) {
      if (email === users[i].email && password === users[i].password) {
        valid = true;
        swal('Greetings!', 'Logged In!', 'success');
        window.location = `/dashboard/${email}`;
        break;
      }
    }
    if (valid === false) {
      swal('Greetings!', 'Incorrect Credentials!', 'error');
      valid = true;
    }
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
            <form action='' method='post' onSubmit={this.onlogin}>
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
              <div className='input-group mb-3'>
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
              <input
                type='submit'
                className='btn btn-secondary btn-block'
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
