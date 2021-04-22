import React, { Component } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import swal from 'sweetalert';
import Navbar from '../layouts/Navbar';
import axios from 'axios';

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

  ondelete = (value) => {
    let storage = localStorage.getItem('data');
    storage = JSON.parse(storage);
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].email === value.email) {
        storage.splice(i, 1);
        localStorage.setItem('data', JSON.stringify(storage));
        this.forceUpdate();
      }
    }
  };

  componentDidMount = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
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

  onupdate = () => {
    const { name_2, email_2, number_2, date_2, salary_2 } = this.state;
    let storage = localStorage.getItem('data');
    storage = JSON.parse(storage);
    let data = {
      name: name_2,
      email: email_2,
      number: number_2,
      date: date_2,
      salary: salary_2,
    };
    for (let i = 0; i < storage.length; i++) {
      if (storage[i].email === email_2) {
        storage.splice(i, 1, data);
        localStorage.setItem('data', JSON.stringify(storage));
      }
    }
  };

  onAdd = async (e) => {
    const { id, name, email, phone, DoJ, salary } = this.state;

    let data = {
      id,
      name,
      email,
      phone,
      DoJ,
      salary,
    };

    const res = await axios.post('http://localhost:5000/api/users', data);

    console.log(res.data);

    // let canAdd = false;
    // let storage = localStorage.getItem('data');
    // storage = JSON.parse(storage);
    // for (let i = 0; i < storage.length; i++) {
    //   if (storage[i].email === email_1) {
    //     canAdd = false;
    //     break;
    //   } else {
    //     canAdd = true;
    //   }
    // }
    // if (localStorage.getItem('data') !== null && canAdd) {
    //   data = storage.concat(data);
    //   localStorage.setItem('data', JSON.stringify(data));
    // } else if (localStorage.getItem('data') === null && canAdd) {
    //   localStorage.setItem('data', JSON.stringify(data));
    // } else {
    //   e.preventDefault();
    //   swal('Greetings!', 'User Already Exists!', 'warning');
    // }
  };

  onchange = () => {
    let email = document.getElementById('email').value;
    let name = document.getElementById('name').value;
    let phone = document.getElementById('number').value;
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
    const { id, name, email, phone, DoJ, salary, users } = this.state;
    // const { email } = this.props.match.params;

    return (
      <div>
        {/* <Navbar email={email} /> */}
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
                  {users.length !== 0
                    ? users.map((value) => (
                        <tr>
                          <td>{value.id}</td>
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
                            </div>
                          </td>
                        </tr>
                      ))
                    : null}
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
                  <form action='' onSubmit={this.onAdd}>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Id</span>
                      </div>
                      <input
                        type='text'
                        id='id'
                        placeholder='Enter Id'
                        value={id}
                        name='id'
                        onChange={this.onchange}
                        className='form-control'
                        required
                      />
                    </div>
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
                  <form action='' onSubmit={this.onupdate}>
                    <div className='input-group mb-3'>
                      <div className='input-group-prepend'>
                        <span className='input-group-text'>Id</span>
                      </div>
                      <input
                        type='text'
                        id='id'
                        value={id}
                        name='id'
                        onChange={this.onchange}
                        className='form-control'
                        disabled
                      />
                    </div>
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
