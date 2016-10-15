import React from 'react';
import Header from './Header';
import TabList from './TabList';
import CalendarPane from './CalendarPane';
import PatientList from './PatientList';

export default class App extends React.Component {
  render() {
    return (
      <section id='container'>
        <Header />
        <main>
          <TabList />
          <div className="tab-content">
            <CalendarPane />
            <PatientList />
          </div>
        </main>
      </section>
    );
  }
}
