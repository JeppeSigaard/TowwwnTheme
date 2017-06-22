

// Event Calendar View
const React = require( 'react' ),
      Event = require( '../components/event.js' ),
      Railbar = require( '../componentParts/railbar.js' ),
      EventFilterButton  = require( '../componentParts/eventFilterButton.js' ),
      SponsorBanner  = require( '../componentParts/sponsorBanner.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Loader  = require( '../componentParts/loader.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class EventCalendarView extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { containerClasses : 'eventscontainer', allLoaded : false, headerCollapsed : false, view : 'grid' };
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
        this.allLoaded = false; this.setState({allLoaded : false});
        Globals.setMainState({'jsxEvents' : null});
        this.properties = {
            per_page : 24,
            page : 1,
            after : '-1 hour',
        };
        this.loadEvents('future');
    }

    togglePast(){
        if( !this.loadReturned ) return;
        this.allLoaded = false; this.setState({allLoaded : false});
        Globals.setMainState({'jsxEvents' : null});
        this.properties = {
            per_page : 24,
            page : 1,
            before : '-1 hour',
        };
        this.loadEvents('past');
    }

    applySponsorBanner(){
        return new Promise(( resolve, reject) => {
            const commercialOptions = {
                for : 'event_calendar',
                per_page : 3,
            };

            Globals.CommercialDataHandler.getCommercials(commercialOptions).then((resp) =>{

                if(resp.length < 1) resolve(null);

                let events = this.props.events;
                let jsxCommercials = [];
                let sponsorbanners = [];
                const time = new Date().getTime();


                for(let item in resp){
                    if(resp.hasOwnProperty(item)){
                        sponsorbanners.push(<SponsorBanner type="event_calendar" key={'calendar-banner-'+resp[item].id} item={resp[item]}></SponsorBanner>);
                    }
                }

                jsxCommercials.push(<Railbar className="calendar-banner-container" name={'sponsor-banner-' + time} key={'sponsor-banner-' + time} snap sizes={{0:1}} children={sponsorbanners} dots></Railbar>);

                resolve(jsxCommercials);
            });

        });
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
            this.allLoaded = false; this.setState({allLoaded : false});
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
                per_page : 9999,
                page : 1,
                ids : events,
                after : '-1 hour',
            };

            this.loadEvents('hearts');
            this.allLoaded = true; this.setState({allLoaded : true});
        }
    }

    togglePredicted(){
        this.allLoaded = false; this.setState({allLoaded : false});
        Globals.setMainState({'jsxEvents' : null});

        this.properties = {
            per_page : 24,
            page : 1,
            after : 'now',
            cat : this.state.predictedCats,
        };

        this.loadEvents('predicted');
    }

    toggleView(){
        if(this.state.view !== 'grid') this.setState({view : 'grid'});
        else  this.setState({view : 'line'});
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
                this.allLoaded = true; this.setState({allLoaded : true});
                return;
            }

            this.eventsLength = resp.length;

            if ( resp.length > 23 ) {
                this.allLoaded = false; this.setState({allLoaded : false});
                this.properties.page ++;
            }

            else {
                this.allLoaded = true; this.setState({allLoaded : true});
            }



            let events = this.props.events;
            if(null == events){events = [];}

            const time = new Date().getTime();
            resp.forEach(( item, index ) => {
                events.push( <Event from={ this.props.name } elem={ item } key={ 'event-' + time + item.id } setMainState={ this.props.setMainState } /> );
            });

            Globals.setMainState({'jsxEvents' : events});

            if(resp.length > 23){

                this.applySponsorBanner().then((banner) => {
                    if(null != banner){
                        events.push(banner);
                        Globals.setMainState({'jsxEvents' : events});
                    }

                    this.loadReturned = true;
                });
            }

            else{
                 this.loadReturned = true;
            }
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

        let section_class = 'container-section large-header';
        if (this.state.view == 'line') section_class += ' line';

        return (
            <section className={section_class} id="event-calendar-view">
                <Header for=".scroll-container" in="#event-calendar-view">
                    <ViewTopBar icon="#icon-star" viewBox="0 0 32 32" title="Begivenheder">
                        <div className="viewbar-button view-toggle" onClick={ this.toggleView.bind(this) } >
                            {this.state.view === 'line' &&
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-block-layout" ></use>
                            </svg>}

                            {this.state.view !== 'line' &&
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-list-layout" ></use>
                            </svg>}
                        </div>
                    </ViewTopBar>
                    <Railbar name="event-calendar-buttons" snap>
                        <EventFilterButton onClick={this.toggleFuture.bind(this)} name="Kommende" active/>
                        <EventFilterButton onClick={this.toggleHeart.bind(this)} icon="#icon-heart" viewBox="0 0 32 32"/>
                        { this.state.showPredictedButton !=null && <EventFilterButton onClick={this.togglePredicted.bind(this)} name="anbefalede"/>}
                        <EventFilterButton onClick={this.togglePast.bind(this)} name="Tidligere"/>
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
