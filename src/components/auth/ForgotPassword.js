import React, { Component } from 'react';
import swal from 'sweetalert';
import axios from 'axios';

export default class ForgotPassword extends Component {
  state = {
    email: '',
    link: '',
  };

  onchange = () => {
    let email = document.getElementById('email').value;
    let link = document.getElementById('link').value;

    this.setState({ email, link });
  };

  onBack = (e) => {
    this.props.history.goBack();
  };

  onSend = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    const baseUrl =
      process.env.REACT_APP_BASE_URL_LOCAL ||
      process.env.REACT_APP_BASE_URL_PROD;
    const res = await axios.post(`${baseUrl}/api/auth/forgotpassword`, {
      email,
    });

    if (!res.data.success) {
      return swal('Greetings', res.data.message, 'error');
    }

    swal('Greetings', res.data.message, 'success');
  };

  render() {
    const { email, link } = this.state;

    return (
      <div className='container mt-5'>
        <div className='row'>
          <div className='col-md-8'>
            <div className='card'>
              <div className='card-header'>
                <h6>
                  In order to change password, a link will be sent on your
                  email.
                </h6>
              </div>
              <div className='card-body'>
                <form action='' method='post' onSubmit={this.onSend}>
                  <div className='input-group mb-3'>
                    <div className='input-group-prepend'>
                      <span className='input-group-text'>Email</span>
                    </div>
                    <input
                      onChange={this.onchange}
                      type='email'
                      id='email'
                      value={email}
                      name='email'
                      placeholder='Enter Email'
                      className='form-control'
                      required
                    />
                    <div class='input-group-append'>
                      <button class='btn btn-primary' type='submit'>
                        Send Link
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <button className='btn btn-primary btn-block' onClick={this.onBack}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }
}
