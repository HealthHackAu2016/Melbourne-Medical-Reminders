import React from 'react';

export default class CalendarPane extends React.Component {
  render() {
    return (
      <div>
        <h2>Calendar</h2>
        <iframe src="https://calendar.google.com/calendar/embed?src=cakesy%40gmail.com&ctz=Australia/Sydney" width="800" height="600" frameBorder="0" scrolling="no"></iframe>
      </div>
    );
  }
}
