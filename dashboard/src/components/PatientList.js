import React from 'react';
import PatientStub from './PatientStub';

export default class PatientList extends React.Component {
  render() {
    var patientListItems = this.props.patients.map((patient) => {
      return <PatientStub key={patient._id} patient={patient} />
    });

    return (
      <div role="tabpanel" className="tab-pane" id="patient-list">
        <h2>Patients</h2>
        {patientListItems}
      </div>
    );
  }
}
