import React from 'react';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <ul className='nav nav-tabs'>
          <li role='presentation' className={!window.location.hash.includes('calendar') ? 'active' : ''}>
            <Link to='/' role='tab'>Patients</Link>
          </li>
          <li role='presentation' className={window.location.hash.includes('calendar') ? 'active' : ''}>
            <Link to='/calendar' role='tab'>Calendar</Link>
          </li>
        </ul>
      </nav>
    );
  }
}
