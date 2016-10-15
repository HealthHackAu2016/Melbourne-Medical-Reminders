import React from 'react';
import SearchForm from './SearchForm';
import PatientStub from './PatientStub';

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

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.state = {
      patients: patients
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    });
  }

  onSubmit() {
    var results = patients.filter((patient) => {
      return patient.name.toLowerCase().includes(
        this.state.searchTerm.toLowerCase()
      );
    });
    this.setState({
      patients: results
    });
  }

  render() {
    var patientListItems = this.state.patients.map((patient) => {
      return <PatientStub key={patient._id} patient={patient} />
    });

    return (
      <div>
        <h2>Patients</h2>
        <SearchForm onChange={this.onChange}
          onSubmit={this.onSubmit} />
        {patientListItems.length > 0 ? patientListItems : 'No patients found.'}
      </div>
    );
  }
}
