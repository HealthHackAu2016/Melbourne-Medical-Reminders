import React from 'react';

export default class TabList extends React.Component {
  render() {
    return (
      <ul className="nav nav-tabs" role="tablist">
        <li role="presentation" className="active">
          <a href="#calendar" aria-controls="calendar" role="tab" data-toggle="tab">Calendar</a>
        </li>
        <li role="presentation" data-toggle="tab">
          <a href="#patient-list" aria-controls="patient-list" role="tab" data-toggle="tab">Patients</a>
        </li>
      </ul>
    );
  }
}
