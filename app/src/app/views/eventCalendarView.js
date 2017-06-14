

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      EventFilterButton  = require( '../componentParts/eventFilterButton.js' ),
      Loader  = require( '../componentParts/loader.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { containerClasses : 'eventscontainer', allLoaded : false, headerCollapsed : false };
        this.eventsLength = 0;
        this.allLoaded = false;
        this.loadReturned = true;
        this.properties = {
            per_page : 24,
            page : 1,
            after : 'now',
        };

        Globals.user.hooks.add( 'onlogin', ( ) => {
            this.userHook();
        });
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
        this.loadEvents('future');
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
        this.loadEvents('past');
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

            let events = [];
            if ( Globals.user.state.hearts != null) {
                const eventHearts = Globals.user.state.hearts.events;

                for(let id in eventHearts){
                    if (eventHearts.hasOwnProperty(id) && eventHearts[id] !=null  && eventHearts[id] != false){
                        events.push(id);
                    }
                }
            }

            if(events.length < 1){
                events.push(0);
            }

            this.properties = {
                per_page : 24,
                page : 1,
                ids : events,
            };

            this.loadEvents('hearts');
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

        this.loadEvents('predicted');
    }

    // Load Events
    loadEvents(type) {

        if ( this.allLoaded ) return;
        if( !this.loadReturned ) return;
        this.loadReturned = false;

        Globals.eventDataHandler.getEvents( this.properties ).then((resp) => {

            if (resp.length < 1 && type != null){

                const intro_text = {
                    predicted : 'Her samler vi de begivenheder vi tror du vil sætte ekstra stor pris på at se. Lige nu har vi ingen anbefalinger',
                    hearts : 'Her er plads til alle dine favorit-begivenheder. Giv et hjerte til en begivenhed, du gerne vil huske, og du kan finde den her.',
                    future : 'Der er ingen kommende begivenheder i vores kalender.',
                    past : 'Der fandtes ingen afsluttede begivenheder i vores kalender',

                };

                let intro = [];
                intro.push(
                    <div key="intro-text-for-hearts" className="hearts-intro">
                       {intro_text[type] != null &&
                        <p>{intro_text[type]}</p>
                       }
                       {intro_text[type] == null &&
                       <p>Ingen resultater fundet</p>}
                    </div>
                );

                Globals.setMainState({'jsxEvents' : intro});
                this.loadReturned = true;
                this.setState({allLoaded : true});
                return;
            }

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

    userHook (){

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
    }

    // Component did mount
    componentDidMount() {
        this.loadEvents();
    }

    // Component did update
    componentDidUpdate() {

        if ( this.props.events != null ) {

        }
    }

    expandHeader(){this.setState({headerCollapsed: false})}
    collapseHeader(){this.setState({headerCollapsed: true})}

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
                <ScrollContainer  name="event-calendar-scroll-content" onScroll={ this.onscroll.bind(this) } header="#event-calendar-view .section-header">
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
                </ScrollContainer>
            </section>
        );
    }

} module.exports = EventCalendarView;
