import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
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
              <Link className='nav-link' to='/'>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
