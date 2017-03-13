

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' ),
      Globals = require( '../globals.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { containerClasses : 'eventscontainer' };
        this.eventsLength = 0;
        this.allLoaded = false;
    }

    // Set event layout
    setEventLayout( ) {
        if ( this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer' });
        else if ( !this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer lineLayout' });
    }
    
    // Load more
    loadMore() {
        if ( this.allLoaded ) return;
        
        document.getElementById( 'eventcv-load-more' ).innerHTML = 'Indlæser...';
        Globals.eventDataHandler.getFutureEvents( 25, true ).then((resp) => {
            
            if ( resp.length > this.eventsLength && resp.length % 25 === 0 ) {
                document.getElementById( 'eventcv-load-more' ).innerHTML = 'Indlæs 25 mere'; 
            } else {
                document.getElementById( 'eventcv-load-more' ).innerHTML = 'Alt indhold indlæst';
                this.allLoaded = true;
            } this.eventsLength = resp.length;
            
            let events = [];
            resp.forEach(( item, index ) => {
                events.push( <Event elem={ item } key={ 'event-' + item.fbid } setMainState={ this.props.setMainState } /> )
            });

            this.props.setMainState({
                'eventsData' : resp,
                'jsxEvents' : events,
            });
        });
        
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


                            <div className={ this.state.containerClasses + '-outer' } >
                                <div className={ this.state.containerClasses }>

                                    {/* Renders events */}
                                    { typeof this.props.events !== 'undefined' &&
                                      this.props.events !== null &&
                                      this.props.events }

                                </div>
                            </div>
                            <div id="eventcv-load-more" onClick={ this.loadMore.bind(this) } >Indlæs 25 mere</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventCalendarView;
