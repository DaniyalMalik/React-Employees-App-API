import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import Navbar from '../layouts/Navbar';
import Spinner from '../layouts/Spinner';

export default class Details extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    phone: '',
    salary: '',
    DoJ: '',
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const res = await axios.get(`http://localhost:5000/api/v1/employees/${id}`);
    const data = res.data.data;
    let type = '';

    res.data.success ? (type = 'success') : (type = 'error');

    if (!res.data.success) {
      return swal('Greetings!', res.data.message, type);
    }

    this.setState({
      id: data._id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      salary: data.salary,
      DoJ: data.DoJ,
    });
  };

  render() {
    const { id, email, name, phone, DoJ, salary } = this.state;
    const { params_email } = this.props.match.params;

    return (
      <div>
        <Navbar email={params_email} />
        <div className='container mt-4'>
          <div className='row'>
            <div className='col-md-8'>
              {email !== '' ? (
                <div>
                  <h1>{name}</h1>
                  <ul className='list-group'>
                    <li className='list-group-item'>
                      <b>Id: </b>
                      {id}
                    </li>
                    <li className='list-group-item'>
                      <b>Email: </b>
                      {email}
                    </li>
                    <li className='list-group-item'>
                      <b>Phone: </b>
                      {phone}
                    </li>
                    <li className='list-group-item'>
                      <b>Salary: </b>
                      {salary}
                    </li>
                    <li className='list-group-item'>
                      <b>Date of Joining: </b>
                      {DoJ}
                    </li>
                  </ul>
                </div>
              ) : (
                <Spinner />
              )}
            </div>
            <div className='col-md-4'>
              <button
                className='btn btn-primary btn-block'
                onClick={() => window.history.back()}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
