

// Imports
import React from 'react';
import CalendarView from './views/calendarview.js';

// App Instance component
class AppInstance extends React.Component {

  // Render
  render() {
    return (
      <div className="app">
        <div className="app-inner">
          <CalendarView store={ this.props.store } />
        </div>
      </div>
    );
  }

  // Component did mount
  componentDidMount() {

    // Removes load state
    let body = document.getElementsByTagName('body');
    for ( let n = 0; n < body.length; n++ ) {
      body[n].classList.remove( 'loading' );
    }

  }

}

// Exports
export default AppInstance;
