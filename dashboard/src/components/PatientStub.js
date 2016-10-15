import React from 'react';
import { Link } from 'react-router';

export default class PatientStub extends React.Component {
  render() {
    var patient = this.props.patient;
    return (
      <Link to={'/patient/' + patient._id}>
        <div className='patient-stub row'>
          <div className='patient-photo col-xs-3 col-md-1'>
            <img src={patient.photo} alt='patient photo' />
          </div>
          <div className='col-xs-9 col-md-11'>
            <dl className='dl-horizontal'>
              <dt>Name</dt>
              <dd>{patient.name}</dd>
              <dt>Phone no.</dt>
              <dd>{patient.phone_no}</dd>
              <dt>Permissions</dt>
              <dd>
                {
                  patient.permissions.map((p) => {
                    return p.content
                  }).join(', ')
                }
              </dd>
            </dl>
          </div>
        </div>
      </Link>
    );
  }
}
