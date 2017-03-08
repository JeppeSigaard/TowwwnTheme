

// Event single view layout
const React = require( 'react' );
class EventSingleView extends React.Component {

    // Ctor
    constructor() { super(); }

    // Render
    render() {
        return (
            <section className="container-section" id="event-single-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <div className="eventscontainer">

                                {/* Renders events */}
                                { typeof this.props.event !== 'undefined' &&
                                  this.props.event !== null &&
                                  this.props.event }

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventSingleView;
