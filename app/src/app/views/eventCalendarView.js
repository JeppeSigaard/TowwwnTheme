

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
        this.lastScrollTop = 0;
        this.scrollBuffer = 0;
        this.state = { containerClasses : 'eventscontainer' };
        this.eventsLength = 0;
        this.allLoaded = false;
        this.loadReturned = true;
        this.properties = {
            per_page : 24,
            page : 1,
            after : 'now',
        };
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
        let loadEventsBtn = document.getElementById('eventcv-load-more');
        if( this.isInView( loadEventsBtn, 100 ) && this.loadReturned ) {
           this.loadEvents();
        }

       this.setHeader();
    }

    setHeader(){
        let st = _('#event-calendar-view .scroll-container').get()[0].scrollTop;
        if (this.scrollBuffer > 2 && st > this.lastScrollTop && st > _('#event-calendar-view .section-header .viewbar').height()) {
            _('#event-calendar-view .section-header').addClass('collapse');
            this.scrollBuffer = 0;
        }
        else if(this.scrollBuffer > 2){
            _('#event-calendar-view .section-header').removeClass('collapse');
            this.scrollBuffer = 0;
        }
        else{this.scrollBuffer ++;}

        this.lastScrollTop = st;
    }

    // Set event layout
    setEventLayout() {

        if ( this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer' });
        else if ( !this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer lineLayout' });
    }

    toggleFuture(){
        this.setHeader();
        if( !this.loadReturned ) return;
        Globals.setMainState({'jsxEvents' : null});
        this.properties = {
            per_page : 24,
            page : 1,
            after : 'now',
        };
        this.loadEvents();
    }

    togglePast(){
        this.setHeader();
        if( !this.loadReturned ) return;
        Globals.setMainState({'jsxEvents' : null});
        this.properties = {
            per_page : 24,
            page : 1,
            before : 'now',
        };
        this.loadEvents();
    }

    toggleHeart(){}

    // Load Events
    loadEvents() {

        if ( this.allLoaded ) return;
        if( !this.loadReturned ) return;
        this.loadReturned = false;

        Globals.eventDataHandler.getEvents( this.properties ).then((resp) => {

            if ( resp.length > 23 ) {

                if ( _( '.eventcv-load-more' )) _( '.eventcv-load-more' ).addClass('loading');
                this.properties.page ++;

            } else {

                if ( _( '.eventcv-load-more' )) _( '.eventcv-load-more' ).removeClass('loading');
                this.allLoaded = true;

            } this.eventsLength = resp.length;

            let events = this.props.events;
            if(null == events){events = [];}

            resp.forEach(( item, index ) => {
                events.push( <Event from={ this.props.name } elem={ item } key={ 'event-' + item.fbid } setMainState={ this.props.setMainState } /> );
            });

            Globals.setMainState({'jsxEvents' : events});

            this.loadReturned = true;

        });

    }

    // Component did mount
    componentDidMount() {
        this.lazyLoad = new LazyLoadHandler( '#event-calendar-view .scroll-container' );
        _( '#event-calendar-view .scroll-container' ).on( 'scroll', this.onscroll.bind(this) );

        this.loadEvents();
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
            <section className="container-section large-header" id="event-calendar-view">
                <header className="section-header">
                    <div className="viewbar" id="eventsbar">
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
                    <Railbar name="event-calendar-buttons" snap>
                        <EventFilterButton onClick={this.toggleFuture.bind(this)} name="Kommende" active/>
                        <EventFilterButton onClick={this.togglePast.bind(this)} name="Tidligere"/>
                    </Railbar>
                </header>
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
                      this.props.events !== null && <div id="eventcv-load-more" className="loading"></div>
                    }
                </div>
            </section>
        );
    }

} module.exports = EventCalendarView;
