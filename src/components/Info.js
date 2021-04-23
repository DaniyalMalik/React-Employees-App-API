import React, { Component } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import swal from 'sweetalert';
import Navbar from '../layouts/Navbar';
import axios from 'axios';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';

export default class Info extends Component {
  state = {
    users: [],
    id: '',
    name: '',
    email: '',
    phone: '',
    DoJ: '',
    salary: '',
  };

  componentDidMount = async () => {
    const res = await axios.get('http://localhost:5000/api/users');

    this.setState({ users: res.data });
  };

  onDelete = async (value) => {
    const id = value.id;
    const res = await axios.delete(`http://localhost:5000/api/users/${id}`);

    this.setState({ users: res.data });
  };

  onlogout = () => {
    window.location = '/';
  };

  onUpdateClick = (value) => {
    let id = value.id;
    let name = value.name;
    let email = value.email;
    let phone = value.phone;
    let DoJ = value.DoJ;
    let salary = value.salary;

    this.setState({
      id,
      name,
      email,
      phone,
      DoJ,
      salary,
    });
  };

  onAddClick = () => {
    let id = '';
    let name = '';
    let email = '';
    let phone = '';
    let DoJ = '';
    let salary = '';

    this.setState({
      id,
      name,
      email,
      phone,
      DoJ,
      salary,
    });
  };

  onUpdate = async (id) => {
    const { name, email, phone, DoJ, salary } = this.state;
    const updUser = { name, email, phone, DoJ, salary };

    await axios.put(`http://localhost:5000/api/users/${id}`, updUser);
  };

  onAdd = async () => {
    const { name, email, phone, DoJ, salary } = this.state;

    let data = {
      name,
      email,
      phone,
      DoJ,
      salary,
    };

    await axios.post('http://localhost:5000/api/users', data);
  };

  onchange_1 = () => {
    let name = document.getElementById('name-1').value;
    let email = document.getElementById('email-1').value;
    let phone = document.getElementById('phone-1').value;
    let salary = document.getElementById('salary-1').value;
    let DoJ = document.getElementById('date-1').value;

    this.setState({
      name,
      email,
      phone,
      DoJ,
      salary,
    });
  };

  onchange_2 = () => {
    let name = document.getElementById('name-2').value;
    let email = document.getElementById('email-2').value;
    let phone = document.getElementById('phone-2').value;
    let salary = document.getElementById('salary-2').value;
    let DoJ = document.getElementById('date-2').value;

    this.setState({
      name,
      email,
      phone,
      DoJ,
      salary,
    });
  };

  render() {
    const { id, name, email, phone, DoJ, salary, users } = this.state;
    const { params_email } = this.props.match.params;
    let count = 0;

    return (
      <div>
        <Navbar email={params_email} />
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-9'>
              <table className='table table-stripped'>
                <thead>
                  <tr>
                    <th>Serial No. </th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Number</th>
                    <th>Date Of Joining</th>
                    <th>Salary</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length !== 0 ? (
                    users.map((value) => (
                      <tr>
                        <td>{++count}</td>
                        <td>{value.name}</td>
                        <td>{value.email}</td>
                        <td>{value.phone}</td>
                        <td>{value.DoJ}</td>
                        <td>{value.salary}</td>
                        <td>
                          <div className='btn-group'>
                            <input
                              type='submit'
                              className='btn btn-danger'
                              onClick={() => this.onDelete(value)}
                              value='Delete'
                            />
                            <input
                              onClick={() => this.onUpdateClick(value)}
                              type='submit'
                              data-toggle='modal'
                              data-target='#updateData'
                              className='btn btn-secondary'
                              value='Edit'
                            />
                            <Link
                              to={{
                                pathname: `/dashboard/details/${params_email}/${value.id}`,
                              }}
                              className='btn btn-primary'>
                              Details
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <Spinner />
                  )}
                </tbody>
              </table>
            </div>
            <div className='col-md-3'>
              <input
                type='submit'
                className='btn btn-success btn-block'
                value='Add'
                onClick={this.onAddClick}
                data-toggle='modal'
                data-target='#addData'
              />
            </div>
          </div>

          {/* Add an employee */}
          <div className='modal' id='addData'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>Add Employee</h4>
                  <button type='button' className='close' data-dismiss='modal'>
                    &times;
                  </button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={this.onAdd}>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Name</span>
                      </div>
                      <input
                        type='text'
                        id='name-1'
                        placeholder='Enter Name'
                        value={name}
                        name='name'
                        onChange={this.onchange_1}
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
                        id='email-1'
                        onChange={this.onchange_1}
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
                        id='phone-1'
                        placeholder='Enter Phone Number'
                        value={phone}
                        name='phone'
                        onChange={this.onchange_1}
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
                        id='salary-1'
                        placeholder='Enter Salary'
                        name='salary'
                        onChange={this.onchange_1}
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
                        id='date-1'
                        value={DoJ}
                        onChange={this.onchange_1}
                        name='date'
                        className='form-control'
                        required
                      />
                    </div>
                    <input
                      value='Add'
                      name='add'
                      type='submit'
                      className='btn btn-success btn-block'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Update an employee */}
          <div className='modal' id='updateData'>
            <div className='modal-dialog'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h4 className='modal-title'>Update Employee</h4>
                  <button type='button' className='close' data-dismiss='modal'>
                    &times;
                  </button>
                </div>
                <div className='modal-body'>
                  <form onSubmit={() => this.onUpdate(id)}>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Name</span>
                      </div>
                      <input
                        type='text'
                        id='name-2'
                        placeholder='Enter Name'
                        value={name}
                        name='name'
                        onChange={this.onchange_2}
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
                        id='email-2'
                        onChange={this.onchange_2}
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
                        id='phone-2'
                        placeholder='Enter Phone Number'
                        value={phone}
                        name='phone'
                        onChange={this.onchange_2}
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
                        id='salary-2'
                        placeholder='Enter Salary'
                        name='salary'
                        onChange={this.onchange_2}
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
                        id='date-2'
                        value={DoJ}
                        onChange={this.onchange_2}
                        name='date'
                        className='form-control'
                        required
                      />
                    </div>
                    <input
                      value='Update'
                      name='update'
                      type='submit'
                      className='btn btn-success btn-block'
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
