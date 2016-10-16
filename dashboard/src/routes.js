import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PatientList from './components/PatientList';
import CalendarPane from './components/CalendarPane';
import Profile from './components/Profile';
import PatientForm from './components/PatientForm';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={PatientList} />
    <Route path='/patient/new' component={PatientForm} />
    <Route path='/patient/edit/:patientId' component={PatientForm} />
    <Route path='/patient/:patientId' component={Profile} />
    <Route path='/calendar' component={CalendarPane} />
  </Route>
);
