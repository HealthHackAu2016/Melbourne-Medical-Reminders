import React from 'react';
import Header from './Header';
import TabList from './TabList';
import CalendarPane from './CalendarPane';
import PatientList from './PatientList';

// Dummy data
var permissions = {
  MAKE_CALLS: {
    value: 2,
    content: 'make calls'
  },
  WEEKLY_VIEW: {
    value: 1,
    content: 'weekly view'
  },
  DAILY_VIEW: {
    value: 0,
    content: 'daily view'
  }
};

var patients = [
  {
    _id: '1',
    name: 'Alice',
    phone_no: '555 555 555',
    photo: 'http://imgur.com/FVtfcCU.png',
    permissions: [
      permissions.MAKE_CALLS,
      permissions.WEEKLY_VIEW,
      permissions.DAILY_VIEW
    ]
  },
  {
    _id: '2',
    name: 'Bob',
    phone_no: '777 000 000',
    photo: 'http://imgur.com/0MpvdjO.png',
    permissions: [
      permissions.WEEKLY_VIEW,
      permissions.DAILY_VIEW
    ]
  },
  {
    _id: '3',
    name: 'Charlie',
    phone_no: '777 777 777',
    photo: 'http://i.imgur.com/XC1rBRB.jpg',
    permissions: [
      permissions.DAILY_VIEW
    ]
  },
  {
    _id: '4',
    name: 'Denise',
    phone_no: '779 787 777',
    photo: 'https://i.imgur.com/Ab8fSVn.jpg',
    permissions: [
      permissions.WEEKLY_VIEW,
      permissions.DAILY_VIEW
    ]
  },
  {
    _id: '5',
    name: ';\'DROP TABLE USERS;',
    phone_no: '555 555 888',
    photo: 'https://i.imgur.com/jksjyrb.jpg',
    permissions: [
      permissions.DAILY_VIEW
    ]
  }
];

export default class App extends React.Component {
  render() {
    return (
      <section id='container'>
        <Header />
        <main>
          <TabList />
          <div className="tab-content">
            <CalendarPane />
            <PatientList patients={patients} />
          </div>
        </main>
      </section>
    );
  }
}
