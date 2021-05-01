import React, { Component } from 'react';
import swal from 'sweetalert';
import Navbar from '../layouts/Navbar';
import axios from 'axios';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';

export default class Employees extends Component {
  state = {
    users: [],
  };

  componentDidMount = async () => {
    const res = await axios.get(
      `${
        process.env.REACT_APP_BASE_URL_LOCAL ||
        process.env.REACT_APP_BASE_URL_PROD
      }/api/v1/employees`,
    );
    const users = res.data.data;
    let type = '';

    res.data.success ? (type = 'success') : (type = 'error');

    if (!res.data.success) {
      return swal('Greetings!', res.data.message, type);
    }

    // swal('Greetings!', res?.data?.message, type);
    this.setState({ users });
  };

  onDelete = async (id, e) => {
    e.preventDefault();
    let type = '';

    const res = await axios.delete(
      `${
        process.env.REACT_APP_BASE_URL_LOCAL ||
        process.env.REACT_APP_BASE_URL_PROD
      }/api/v1/employees/${id}`,
    );

    res.data.success ? (type = 'success') : (type = 'error');

    if (type === 'success') {
      return (
        this.setState({ users: res.data.employees }),
        swal('Greetings!', res.data.message, type)
      );
    }

    swal('Greetings!', res.data.message, type);
  };

  onlogout = () => {
    this.props.history.push(`/`);
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
    const { users } = this.state;
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
                        <td>{new Date(value.DoJ).toString()}</td>
                        <td>{value.salary}</td>
                        <td>
                          <div className='btn-group'>
                            <input
                              type='submit'
                              className='btn btn-danger'
                              onClick={(e) => this.onDelete(value._id, e)}
                              value='Delete'
                            />
                            <Link
                              to={`/dashboard/edit/${params_email}/${value._id}`}
                              className='btn btn-secondary'>
                              Edit
                            </Link>
                            <Link
                              to={`/dashboard/details/${params_email}/${value._id}`}
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
