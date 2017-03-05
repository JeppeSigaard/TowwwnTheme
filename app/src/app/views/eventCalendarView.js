

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { containerClasses : 'eventscontainer' };
    }

    // Set event layout
    setEventLayout( ) {
        if ( this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer' });
        else if ( !this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer lineLayout' });
    }

    // Render
    render() {
        return (
            <section className="container-section" id="event-calendar-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                           <div id="eventsbar">
                               <div id="eventslayoutbtns">
                                   <svg viewBox="0 0 32 32" className="blocklayoutbtn" onClick={ this.setEventLayout.bind(this) } >
                                       <use xlinkHref="#icon-block-layout"></use>
                                   </svg>
                                   <svg viewBox="0 0 32 32" className="linelayoutbtn" onClick={ this.setEventLayout.bind(this) } >
                                       <use xlinkHref="#icon-list-layout"></use>
                                   </svg>
                               </div>
                               <div className="monthSelector"></div>
                           </div>
                           <div className="selector"></div>

                            <div className={ this.state.containerClasses }>

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
