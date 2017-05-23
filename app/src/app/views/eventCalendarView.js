

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      EventFilterButton  = require( '../componentParts/eventFilterButton.js' ),
      Loader  = require( '../componentParts/loader.js' ),
      Globals = require( '../globals.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { containerClasses : 'eventscontainer' };
        this.eventsLength = 0;
        this.allLoaded = false;
        this.loadReturned = true;
    }

    // In view
    isInView(element, preloadDistance) {
        let elemTop = element.getBoundingClientRect().top,
            elemBottom = element.getBoundingClientRect().bottom,
            preload = ( preloadDistance != null ) ? preloadDistance : 0,
            isVisibleY = (elemTop >= 0 - preload) && (elemBottom <= window.innerHeight + element.offsetHeight + preload),
            isVisibleX = element.offsetLeft >= 0 && element.offsetLeft < window.innerWidth - 200;

        return isVisibleY && isVisibleX;
    }

    // Scroll event
    onscroll(){
        let loadMoreBtn = document.getElementById('eventcv-load-more');
        if( this.isInView( loadMoreBtn, 100 ) && this.loadReturned ) {
            setTimeout(() => {
                if ( this.isInView( loadMoreBtn, 100 ) && this.loadReturned ) this.loadMore();
            }, 200);
        }
    }

    // Set event layout
    setEventLayout() {

        if ( this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer' });
        else if ( !this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer lineLayout' });
    }

    // Load more
    loadMore() {

        if ( this.allLoaded ) return;
        if( !this.loadReturned ) return;
        this.loadReturned = false;

        // document.getElementById( 'eventcv-load-more' ).innerHTML = 'Indlæser...';
        Globals.eventDataHandler.getFutureEvents( 24, true ).then((resp) => {
            if ( resp.length > this.eventsLength && resp.length % 24 === 0 ) {
                document.getElementById( 'eventcv-load-more' ).classList.add('loading');
            } else {
                document.getElementById( 'eventcv-load-more' ).classList.remove('loading');
                this.allLoaded = true;
            } this.eventsLength = resp.length;

            let events = [];
            resp.forEach(( item, index ) => {
                events.push( <Event from={ this.props.name } elem={ item } key={ 'event-' + item.fbid } setMainState={ this.props.setMainState } /> );
            });

            this.props.setMainState({
                'eventsData' : resp,
                'jsxEvents' : events,
            });

            this.loadReturned = true;
        });

    }

    // Component did mount
    componentDidMount() {
        this.lazyLoad = new LazyLoadHandler( '#event-calendar-view .scroll-container' );
        _( '#event-calendar-view .scroll-container' ).on( 'scroll', this.onscroll.bind(this) );
    }

    // Component did update
    componentDidUpdate() {
        if ( this.props.events != null ) {
            this.lazyLoad.triggerload();
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="event-calendar-view">
               <div id="eventsbar">
                   <div id="eventslayoutbtns">
                        <a className="layoutbtn" href="#" onClick={ this.setEventLayout.bind(this) }>
                            <svg viewBox="0 0 32 32" className="blocklayoutbtn">
                                <use xlinkHref="#icon-block-layout"></use>
                            </svg>
                        </a>
                        <a className="layoutbtn" href="#" onClick={ this.setEventLayout.bind(this) }>
                            <svg viewBox="0 0 32 32" className="linelayoutbtn">
                                <use xlinkHref="#icon-list-layout"></use>
                            </svg>
                        </a>
                   </div>
                   <div className="title">
                       <i className="viewbar-title-icon">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-star"></use>
                            </svg>
                       </i>
                       Begivenheder
                   </div>
               </div>
                <div className="scroll-container">
                    <div className="content">
                        <div className={ this.state.containerClasses + '-outer' } >
                            <div className={ this.state.containerClasses }>

                                {/* Renders events */}
                                { typeof this.props.events !== 'undefined' &&
                                  this.props.events !== null &&
                                  this.props.events }

                            </div>
                        </div>
                        { ( typeof this.props.events == 'undefined' || this.props.events == null ) && <Loader/> }
                    </div>
                    { typeof this.props.events !== 'undefined' &&
                      this.props.events !== null && <div id="eventcv-load-more" className="loading" onClick={ this.loadMore.bind(this) } ></div>
                    }
                </div>
            </section>
        );
    }

} module.exports = EventCalendarView;
