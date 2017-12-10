

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
            style={{ 'backgroundImage' : 'url('+'x'+')' }} >
          </div>
        </header>

        {/* Body */}
        <div className="event-body">
          <div className="title">
            { this.props.title != null && this.props.title }
          </div>
        </div>

      </div>
    );
  }

}

// Exports
export default Event;
