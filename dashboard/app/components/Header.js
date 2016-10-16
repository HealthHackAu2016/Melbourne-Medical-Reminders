import React from 'react';
import { Link } from 'react-router';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to='/'><img src='images/logo.png' alt='lorne community hospital logo' /></Link>
        <h1>Dashboard - Medical Reminders</h1>
      </header>
    );
  }
}
