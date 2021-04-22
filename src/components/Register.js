import React, { Component } from 'react';
import swal from 'sweetalert';

export default class Register extends Component {
  state = {
    email: '',
    password: '',
    repeat_password: '',
  };

  onchange = () => {
    let email = document.getElementById('emailR').value;
    let password = document.getElementById('passwordR').value;
    let repeat_password = document.getElementById('repeat-password').value;
    this.setState({ email, password, repeat_password });
  };

  onregister = (e) => {
    e.preventDefault();
    const { email, password, repeat_password } = this.state;
    let canReg = false,
      users = localStorage.getItem('users');
    users = JSON.parse(users);
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        canReg = false;
        break;
      } else {
        canReg = true;
      }
    }
    if (users !== null && canReg === true) {
      if (password === repeat_password) {
        swal('Greetings!', 'Registered!', 'success');
        let user = [{ email, password }];
        users = users.concat(user);
        localStorage.setItem('users', JSON.stringify(users));
        window.location = `/dashboard/${email}`;
      } else {
        swal('Greetings!', 'Passwords Not Match!', 'error');
      }
    } else if (users === null && canReg === true) {
      if (password === repeat_password) {
        swal('Greetings!', 'Registered!', 'success');
        let user = [{ email, password }];
        localStorage.setItem('users', JSON.stringify(user));
        window.location = `/dashboard/${email}`;
      } else {
        swal('Greetings!', 'Passwords Not Match!', 'error');
      }
    } else {
      swal('Greetings!', 'User Already Exists!', 'error');
    }
  };

  render() {
    const { email, password, repeat_password } = this.state;

    return (
      <div className='container mt-5'>
        <div className='card'>
          <div className='card-header'>
            <h3>Register Form</h3>
          </div>
          <div className='card-body'>
            <form action='' method='post' onSubmit={this.onregister}>
              <div className='input-group mb-3'>
                <div className='input-group-prepend'>
                  <span className='input-group-text'>Email</span>
                </div>
                <input
                  onChange={this.onchange}
                  type='email'
                  id='emailR'
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
                  id='passwordR'
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
                className='btn btn-secondary btn-block'
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
