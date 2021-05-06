import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from '../../layouts/Navbar';
import axios from 'axios';

export default class ResetPassword extends Component {
  state = {
    password: '',
    repeat_password: '',
  };

  onchange = () => {
    let password = document.getElementById('password').value;
    let repeat_password = document.getElementById('repeat-password').value;

    this.setState({ password, repeat_password });
  };

  onBack = (e) => {
    this.props.history.goBack();
  };

  onReset = async (e) => {
    e.preventDefault();
    const { password, repeat_password } = this.state;

    if (password === repeat_password) {
      const { token } = this.props.match.params;
      const baseUrl =
        process.env.REACT_APP_BASE_URL_LOCAL ||
        process.env.REACT_APP_BASE_URL_PROD;
      const res = await axios.put(
        `${baseUrl}/api/auth/resetpassword/${token}`,
        { password },
      );

      if (!res.data.success) {
        return swal('Greetings', res.data.message, 'error');
      }

      const loginToken = res.data.token;

      localStorage.setItem('token', loginToken);
      swal('Greetings', res.data.message, 'success');
      this.props.history.push(`/dashboard/${res.data.user.email}`);
    } else {
      return swal('Greetings', 'Passwords Not Match!', 'error');
    }
  };

  render() {
    const { password, repeat_password } = this.state;

    return (
      <div>
        <Navbar email='' />
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='card'>
                <div className='card-header'>
                  <h3>Change Password Form</h3>
                </div>
                <div className='card-body'>
                  <form action='' method='post' onSubmit={this.onReset}>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>New Password</span>
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
                        <span className='input-group-text'>
                          Repeat New Password
                        </span>
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
                      value='Change Password'
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className='col-md-4'>
              <button
                className='btn btn-primary btn-block'
                onClick={this.onBack}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
