import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header>
        <img src='src/images/logo.png' alt='lorne community hospital logo' />
        <h1>Dashboard - Medical Reminders</h1>
      </header>
    );
  }
}
