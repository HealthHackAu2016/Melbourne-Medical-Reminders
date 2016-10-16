import React from 'react';
import { Link } from 'react-router';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      patient: null,
      saving: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentDidMount() {
    // Fetch patient data
    $.ajax({
      url: 'http://localhost:8080/api/patients/' + this.props.params.patientId
    })
    .done((response) => {
      this.setState({
        patient: response
      });
    })
  }

  onChange() {
    var patient = this.state.patient;
    patient.permissions = {
      MAKE_CALL: this.refs['permission-make-call'].checked,
      WEEKLY_VIEW: this.refs['permission-weekly-view'].checked,
      DAILY_VIEW: this.refs['permission-daily-view'].checked
    }

    this.setState({
      patient: patient
    });
  }

  // Update patient's permission
  onSave() {
    this.setState({
      saving: true
    });

    $.ajax({
      url: `http://localhost:8080/api/patients/${this.state.patient._id}/permissions`,
      method: 'PUT',
      data: this.state.patient.permissions
    })
    .done((response) => {
      var patient = this.state.patient;
      patient.permissions = response;
      this.setState({
        patient: patient,
        saving: false
      });
    })
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

          <div className='actions'>
            <Link to={'/patient/edit/' + this.props.params.patientId}>
              <i className='fa fa-pencil' aria-hidden='true'></i> Edit patient
            </Link>
          </div>

          <div className='row'>
            <div className='col-xs-4 col-md-3'>
              <a target='_blank' href={this.state.patient.photoUrl}><img src={this.state.patient.photoUrl} alt='patient photo' /></a>
            </div>
            <div className='col-xs-8 col-md-9'>
              <h3>Details</h3>
              <dl className='dl-horizontal'>
                <dt>Phone no.</dt>
                <dd>{this.state.patient.phone}</dd>
                <dt>Date of birth</dt>
                <dd>{this.state.patient.dob}</dd>
                <dt>Updated</dt>
                <dd>{this.state.patient.updated}</dd>
                <dt>Contacts</dt>
                <dd>
                  {this.state.patient.phoneBook.map((contact) => {
                    return (
                      <div key={contact._id}>{contact.name}: {contact.phone}</div>
                    );
                  })}
                </dd>
              </dl>
              <h3>Permissions</h3>
              <div className='permissions'>
                <div>
                  <input type='checkbox'
                    id='permission-make-call'
                    ref='permission-make-call'
                    checked={this.state.patient.permissions.MAKE_CALL}
                    onChange={this.onChange} />
                  <label htmlFor='permission-make-call'>Can make calls</label>
                </div>
                <div>
                  <input type='checkbox'
                    id='permission-weekly-view'
                    ref='permission-weekly-view'
                    checked={this.state.patient.permissions.WEEKLY_VIEW}
                    onChange={this.onChange} />
                  <label htmlFor='permission-weekly-view'>Can see weekly view</label>
                </div>
                <div>
                  <input type='checkbox'
                    id='permission-daily-view'
                    ref='permission-daily-view'
                    checked={this.state.patient.permissions.DAILY_VIEW}
                    onChange={this.onChange} />
                  <label htmlFor='permission-daily-view'>Can see daily view</label>
                </div>
                <div>
                  <button onClick={this.onSave}
                    className='btn btn-primary'
                    type='button'
                    disabled={this.state.saving}>
                    Save changes
                  </button> {this.state.saving ? <i className='fa fa-spinner' aria-hidden='true'></i> : ''}
                </div>
              </div>
              <h3>Calendar</h3>
              <div>
                <iframe src="https://calendar.google.com/calendar/embed?src=cakesy%40gmail.com&ctz=Australia/Sydney" width="100%" height="400" frameBorder="0" scrolling="no"></iframe>
              </div>
            </div>
          </div>
          <Link to='/'>Back to patient list</Link>
        </div>
      );
    }
  }
}
