import React, { Component } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import swal from 'sweetalert';
import Navbar from '../layouts/Navbar';
import axios from 'axios';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';

export default class Employees extends Component {
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

  onDelete = async (value, e) => {
    e.preventDefault();
    const id = value.id;
    const res = await axios.delete(`http://localhost:5000/api/users/${id}`);

    this.setState({ users: res.data });

    return res.status !== 200
      ? swal('Greetings!', res.data.error, 'error')
      : swal('Greetings!', 'Deleted!', 'success');
  };

  onlogout = () => {
    this.props.history.push(`/`);
  };

  onUpdate = async (id, e) => {
    e.preventDefault();
    const { name, email, phone, DoJ, salary } = this.state;
    const updUser = { name, email, phone, DoJ, salary };

    const res = await axios.put(
      `http://localhost:5000/api/users/${id}`,
      updUser
    );

    return res.status !== 200
      ? swal('Greetings!', res.data.error, 'error')
      : swal('Greetings!', 'Updated!', 'success');
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
                    users.map((value, index) => (
                      <tr key={index}>
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
                              onClick={(e) => this.onDelete(value, e)}
                              value='Delete'
                            />
                            <Link
                              to={`/dashboard/edit/${params_email}/${value.id}`}
                              className='btn btn-secondary'>
                              Edit
                            </Link>
                            <Link
                              to={`/dashboard/details/${params_email}/${value.id}`}
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
              <Link
                to={`/dashboard/${params_email}/add`}
                className='btn btn-success btn-block'>
                Add
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
