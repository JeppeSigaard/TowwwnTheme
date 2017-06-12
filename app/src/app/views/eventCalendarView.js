

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      EventFilterButton  = require( '../componentParts/eventFilterButton.js' ),
      Loader  = require( '../componentParts/loader.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      Globals = require( '../globals.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.lastScrollTop = 0;
        this.scrollBuffer = 0;
        this.state = { containerClasses : 'eventscontainer', allLoaded : false };
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

        if(element == null) return;

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
    }

    // Set event layout
    setEventLayout() {

        if ( this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer' });
        else if ( !this.state.containerClasses.includes('lineLayout') )
            this.setState({ containerClasses : 'eventscontainer lineLayout' });
    }

    toggleFuture(){
        if( !this.loadReturned ) return;
        this.setState({allLoaded : false});
        Globals.setMainState({'jsxEvents' : null});
        this.properties = {
            per_page : 24,
            page : 1,
            after : 'now',
        };
        this.loadEvents();
    }

    togglePast(){
        if( !this.loadReturned ) return;
        this.setState({allLoaded : false});
        Globals.setMainState({'jsxEvents' : null});
        this.properties = {
            per_page : 24,
            page : 1,
            before : 'now',
        };
        this.loadEvents();
    }

    toggleHeart(){

        if ( Globals.user != null && !Globals.user.state.loggedIn ) {
            Globals.setMainState({ from: 'event-calendar-view' });
            Globals.lastViewState = [ Globals.viewHandler.focusedViews[0], Globals.viewHandler.focusedViews[1] ];
            Globals.viewHandler.changeViewFocus(
                '#user-view',
                '#event-calendar-view',
                false, true, false, true
            );

            Globals.hooks.add('onlogin', this.toggleHeart.bind(this));
        }

        else{

            if( !this.loadReturned ) return;
            this.setState({allLoaded : false});
            Globals.setMainState({'jsxEvents' : null});

            let events = [],
                eventHearts = Globals.user.state.hearts.events;

            for(let id in eventHearts){
                if (eventHearts.hasOwnProperty(id) && eventHearts[id] !=null){
                    events.push(id);
                }
            }

            this.properties = {
                per_page : 24,
                page : 1,
                ids : events,
            };

            this.loadEvents();
        }
    }

    togglePredicted(){
        this.setState({allLoaded : false});
        Globals.setMainState({'jsxEvents' : null});

        this.properties = {
            per_page : 24,
            page : 1,
            after : 'now',
            cat : this.state.predictedCats,
        };

        this.loadEvents();
    }

    // Load Events
    loadEvents() {

        if ( this.allLoaded ) return;
        if( !this.loadReturned ) return;
        this.loadReturned = false;

        Globals.eventDataHandler.getEvents( this.properties ).then((resp) => {

            if ( resp.length > 23 ) {

               this.setState({allLoaded : false});
                this.properties.page ++;

            } else {
                this.setState({allLoaded : true});

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

        Globals.hooks.add('onlogin', () => {
            Globals.user.predictBehaviour().then(( data ) => {

                if ( data.length > 2 ) {
                    data.sort(( a, b ) => {
                        if ( a.output > b.output ) return -1;
                        if ( a.output < b.output ) return 1;
                        return 0;
                    }); data = [ data[0], data[1], data[2] ];
                }

                let predictedCats = [];
                for ( let iter = 0; iter < data.length; iter++ ) {
                     predictedCats.push(data[ iter ].id);
                }

                if(predictedCats.length > 0) this.setState({showPredictedButton : true, predictedCats : predictedCats});
            });
        });

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

        let loadMoreClass = 'eventcv-load-more';
        if(!this.state.allLoaded) loadMoreClass += ' loading';

        return (
            <section className="container-section large-header" id="event-calendar-view">
                <Header for=".scroll-container" in="#event-calendar-view">
                    <div className="viewbar" id="eventsbar">
                        { this.props.layoutbtns != null &&
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
                       </div>}
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
                        { this.state.showPredictedButton !=null && <EventFilterButton onClick={this.togglePredicted.bind(this)} name="anbefalede"/>}
                        <EventFilterButton onClick={this.toggleHeart.bind(this)} icon="#icon-heart" viewBox="0 0 32 32"/>
                    </Railbar>
                </Header>
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
                    { typeof this.props.events !== 'undefined' && this.props.events !== null && this.props.events.length !== 0 &&
                        <div id="eventcv-load-more" className={loadMoreClass}></div>
                    }
                </div>
            </section>
        );
    }

} module.exports = EventCalendarView;
