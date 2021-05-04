import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  onlogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');

    this.props.history.push(`/`);
  };

  render() {
    const { email } = this.props;
    return (
      <div>
        <nav className='navbar navbar-expand-sm bg-dark navbar-dark'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <Link className='nav-link' to={`/dashboard/${email}`}>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={`/dashboard/${email}`}>
                {email}
              </Link>
            </li>
            <li className='nav-item'>
              <a
                href={{ javascript: void 0 }}
                className='nav-link'
                onClick={this.onlogout}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
