import React from 'react';
import { Link } from 'react-router';
import SearchForm from './SearchForm';
import PatientStub from './PatientStub';

export default class PatientList extends React.Component {
  constructor() {
    super();
    this.state = {
      patients: [],
      results: [],
      searchTerm: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.filterPatients = this.filterPatients.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: 'http://localhost:8080/api/patients'
    })
    .done((response) => {
      this.setState({
        patients: response
      }, () => {
        this.filterPatients();
      });
    })
  }

  onChange(searchTerm) {
    this.setState({
      searchTerm: searchTerm
    });
  }

  onSubmit() {
    this.filterPatients();
  }

  filterPatients() {
    var results = this.state.patients.filter((patient) => {
      return typeof patient.name !== 'undefined' &&
        patient.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    });
    this.setState({
      results: results
    });
  }

  render() {
    var patientListItems = this.state.results.map((patient) => {
      return <PatientStub key={patient._id} patient={patient} />
    });

    return (
      <div>
        <h2>Patients</h2>
        <div className='actions'>
          <Link className='btn btn-primary' to='/patient/new'>
            <i className='fa fa-user-plus' aria-hidden={true}></i> Add patient
          </Link>
        </div>
        <SearchForm onChange={this.onChange}
          onSubmit={this.onSubmit} />
        {patientListItems.length > 0 ? patientListItems : 'No patients found.'}
      </div>
    );
  }
}
