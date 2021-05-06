import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class VerifyEmail extends Component {
  state = {
    message: '',
  };

  componentDidMount = async () => {
    const { email } = this.props.match.params;
    const baseUrl =
      process.env.REACT_APP_BASE_URL_LOCAL ||
      process.env.REACT_APP_BASE_URL_PROD;
    const res = await axios.put(`${baseUrl}/api/auth/verifyemail/${email}`);

    this.setState({ message: res.data.message });
  };

  render() {
    const { message } = this.state;

    return (
      <div className='container'>
        <div className='row'>
          <div className='jumbotron mt-5 text-center col-md-8'>
            <h2>{message}</h2>
          </div>
          <div className='col-md-4 mt-5'>
            <Link to='/' className='btn btn-primary btn-block'>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
