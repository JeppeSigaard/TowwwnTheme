

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() { super(); }

    // Render
    render() {
        return (
            <section className="container-section" id="event-calendar-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <div className="eventscontainer">

                                {/* Renders events */}
                                { typeof this.props.events !== 'undefined' &&
                                  this.props.events !== null &&
                                  this.props.events }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventCalendarView;
