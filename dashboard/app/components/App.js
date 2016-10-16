import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import CalendarPane from './CalendarPane';
import PatientList from './PatientList';

export default class App extends React.Component {
  render() {
    return (
      <section id='container'>
        <Header />
        <main>
          <Navbar />
          <div>
            {this.props.children}
          </div>
        </main>
      </section>
    );
  }
}
