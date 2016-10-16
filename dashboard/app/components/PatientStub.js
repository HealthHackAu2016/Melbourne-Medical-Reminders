import React from 'react';
import { Link } from 'react-router';

export default class PatientStub extends React.Component {
  render() {
    var patient = this.props.patient;
    var permissionsList = Object.keys(patient.permissions).map((key) => {
      // Highlight text if patient has given permission
      var hasPermission = patient.permissions[key];
      return (
        <li key={`${patient._id}-${key}`}
          className={hasPermission ? 'has-permission' : 'disabled'}>{key.toLowerCase()}</li>
      );
    });

    return (
      <Link to={'/patient/' + patient._id}>
        <div className='patient-stub row'>
          <div className='patient-photo col-xs-4 col-sm-3 col-md-2'>
            <img src={patient.photoUrl} alt='patient photo' />
          </div>
          <div className='col-xs-5 col-sm-6 col-md-8'>
            <dl>
              <dt>Name</dt>
              <dd>{patient.name}</dd>
              <dt>Phone no.</dt>
              <dd>{patient.phone}</dd>
            </dl>
          </div>
          <div className='col-xs-3 col-sm-3 col-md-2'>
            <dl>
            <dt>Permissions</dt>
            <dd>
              <ul className='patient-permissions'>
                {permissionsList}
              </ul>
            </dd>
            </dl>
          </div>
        </div>
      </Link>
    );
  }
}
