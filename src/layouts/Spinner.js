import React, { Component } from 'react';
import spinner from '../assets/spinner.gif';

export default class Spinner extends Component {
  render() {
    return (
      <div className='container'>
        <img src={spinner} alt='' />
      </div>
    );
  }
}
