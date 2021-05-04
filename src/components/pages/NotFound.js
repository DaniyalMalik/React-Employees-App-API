import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div
        className='container mt-5'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <h1 className='text-danger'>404</h1>&nbsp;
        <h3 className='text-secondary'>Page Not Found!</h3>
      </div>
    );
  }
}
