import React from 'react';
import { Link } from 'react-router';

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

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: null
    };
  }

  componentDidMount() {
    // TODO: Fetch patient data by ID from API
    var patient = patients.find((patient) => {
      return patient._id === this.props.params.patientId;
    });
    this.setState({
      patient: patient
    });
  }

  render() {
    if (!this.state.patient) {
      return (
        <div className='loading'></div>
      );
    }
    else {
      return (
        <div className='profile'>
          <h2>{this.state.patient.name}</h2>
          <div className='row'>
            <div className='col-xs-4 col-md-3'>
              <a target='_blank' href={this.state.patient.photo}><img src={this.state.patient.photo} alt='patient photo' /></a>
            </div>
            <div className='col-xs-8 col-md-9'>
              <h3>Details</h3>
              <dl className='dl-horizontal'>
                <dt>Phone no.</dt>
                <dd>{this.state.patient.phone_no}</dd>
                <dt>Address</dt>
                <dd>Home</dd>
                <dt>Stage</dt>
                <dd>9</dd>
              </dl>
              <h3>Permissions</h3>
              <div className='permissions'>
                <div>
                  <input type='checkbox' /> Can make calls
                </div>
                <div>
                  <input type='checkbox' /> Can see weekly view
                </div>
                <div>
                  <input type='checkbox' /> Can see daily view
                </div>
                <div>
                  <button className='btn btn-primary' type='button'>Save changes</button>
                </div>
              </div>
            </div>
          </div>
          <Link to='/'>Back to patient list</Link>
        </div>
      );
    }
  }
}
