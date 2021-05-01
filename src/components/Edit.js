import React, { Component } from 'react';
import Navbar from '../layouts/Navbar';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import swal from 'sweetalert';

export default class Add extends Component {
  state = {
    email: '',
    name: '',
    salary: '',
    phone: '',
    DoJ: '',
  };

  componentDidMount = async () => {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://employees-app-backend.herokuapp.com/api/v1/employees/${id}`,
    );
    let type = '';

    res.data.success ? (type = 'success') : (type = 'error');

    if (type === 'error') {
      return (type = 'error'), swal('Greetings!', res.data.message, type);
    }

    const users = res.data.data;
    let date = users.DoJ;
    date = date.split('T')[0];

    this.setState({
      id: users._id,
      name: users.name,
      email: users.email,
      DoJ: date,
      salary: users.salary,
      phone: users.phone,
    });
  };

  onUpdate = async (e) => {
    e.preventDefault();

    const { params_email } = this.props.match.params;
    const { id, name, email, phone, DoJ, salary } = this.state;
    const updUser = { name, email, phone, DoJ, salary };
    let type = '';

    const res = await axios.put(
      `https://employees-app-backend.herokuapp.com/api/v1/employees/${id}`,
      updUser,
    );

    res.data.success ? (type = 'success') : (type = 'error');

    swal('Greetings!', res.data.message, type);

    if (type === 'success') {
      this.props.history.push(`/dashboard/${params_email}`);
    }
  };

  onchange = () => {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let salary = document.getElementById('salary').value;
    let DoJ = document.getElementById('date').value;

    this.setState({
      name,
      email,
      phone,
      DoJ,
      salary,
    });
  };

  render() {
    const { params_email } = this.props.match.params;
    const { email, name, DoJ, phone, salary } = this.state;

    return (
      <div>
        <Navbar email={params_email} />
        <div className='container mt-4'>
          <div className='row'>
            <div className='col-md-8'>
              <div className='card'>
                <form onSubmit={this.onUpdate}>
                  <div className='card-header'>
                    <h1>Edit Employee</h1>
                  </div>
                  <div className='card-body'>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Name</span>
                      </div>
                      <input
                        type='text'
                        id='name'
                        placeholder='Enter Name'
                        value={name}
                        name='name'
                        onChange={this.onchange}
                        className='form-control'
                        required
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Email</span>
                      </div>
                      <input
                        type='email'
                        id='email'
                        onChange={this.onchange}
                        placeholder='Enter Email'
                        value={email}
                        name='email'
                        className='form-control'
                        required
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Phone Number</span>
                      </div>
                      <PhoneInput
                        id='phone'
                        placeholder='Enter Phone Number'
                        value={phone}
                        name='phone'
                        onChange={this.onchange}
                        className='form-control'
                        required
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Salary</span>
                      </div>
                      <input
                        value={salary}
                        type='number'
                        id='salary'
                        placeholder='Enter Salary'
                        name='salary'
                        onChange={this.onchange}
                        className='form-control'
                        required
                      />
                    </div>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>
                          Date of Joining
                        </span>
                      </div>
                      <input
                        type='date'
                        id='date'
                        value={DoJ}
                        onChange={this.onchange}
                        name='date'
                        className='form-control'
                        required
                      />
                    </div>
                    <div className='card-footer'>
                      <input
                        value='Update'
                        name='Update'
                        type='submit'
                        className='btn btn-success btn-block'
                      />
                    </div>
                  </div>
                </form>
              </div>
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
