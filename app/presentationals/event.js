

// Imports
import React from 'react';

// Event component
class Event extends React.Component {

  // Render
  render() {
    return (
      <div className="event">

        {/* Head */}
        <header className="event-head">
          <div className="event-image"
            style={{ 'backgroundImage' : 'url('+''+')' }} >
          </div>
        </header>

        {/* Body */}
        <div className="event-body">
          <div className="title">
            { this.props.element['title'] != null && this.props.element['title'] }
          </div>
        </div>

      </div>
    );
  }

}

// Exports
export default Event;
