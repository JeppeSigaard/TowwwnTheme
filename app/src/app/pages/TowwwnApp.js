
// Main page for the towwwn app
require( '../../modules/tools/textPreproccesors.js' );
const React = require( 'react' ),
    Globals = require( '../globals.js' ),

    // Data Handlers
    User = require( '../../modules/handlers/dataHandlers/userDataHandler.js' ),
    EventDataHandler = require( '../../modules/handlers/dataHandlers/eventDataHandler.js' ),
    CategoryDataHandler = require( '../../modules/handlers/dataHandlers/categoryDataHandler.js' ),
    LocationDataHandler = require( '../../modules/handlers/dataHandlers/locationDataHandler.js' ),

    // API Handlers
    FBHandler = require( '../../modules/handlers/apihandlers/fbhandler.js' ),

    // Deep Learning
    NeuralNetwork = require( '../../modules/deepLearning/neuralNetwork.js' ),

    // Views
    SearchView = require( '../views/searchView.js' ),
    SearchResultView = require( '../views/searchResultView.js' ),
    EventSingleView = require( '../views/eventSingleView.js' ),
    EventCalendarView = require( '../views/eventCalendarView.js' ),
    LocationCategoryView = require( '../views/locationCategoryView.js' ),
    LocationListView = require( '../views/locationListView.js' ),
    LocationSingleView = require( '../views/locationSingleView.js' ),

    // Components
    Event = require( '../components/event.js' ),
    LocationCategory = require( '../components/locationCategory.js' ),
    ViewSliderDots = require('../components/viewsliderdots.js'),
    CookiePolicy = require('../components/cookiePolicy.js'),

    // Plugins
    _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
    Slider = require( '../../modules/libaries/slider.js' ),
    ViewHandler = require( '../../modules/handlers/viewHandler.js' ),
    ViewSlider = require( '../../modules/libaries/viewslider.js' ),
    EventHandlers = require( '../../modules/handlers/eventHandlers.js' ),
    historyHandler = require('../../modules/handlers/historyHandler.js'),

    // TMP
    SingleEvent = require( '../components/singleEvent.js' ),

    // Polyfills
    PositionSticky = require ('sticky-position');

// Automatic classes
const EffectHandler = require( '../../modules/handlers/effectHandler.js' );

class TowwwnApp extends React.Component {

    // Ctor
    constructor() {
        super();

        // Checks if mobile
        if ( _(window).width() <= 769 ) _('body').addClass('mobile');

        // Instances
        this.eventHandlers = new EventHandlers();

        // Globals
        Globals.viewHandler = null;
        Globals.locationDataHandler = new LocationDataHandler();
        Globals.fb = new FBHandler();
        Globals.history = new historyHandler();

        this.hasMounted = false;
        this.state = { from: null, currentView: null, };

        // Relations
        Globals.relations = {
            'event-single-view' : {
                left: null,
                right: 'event-calendar-view',
                canleft: false,
                canright: true,
            },
            'event-calendar-view' : {
                left: null,
                right: 'location-category-view',
                canleft: false,
                canright: true,
            },
            'location-category-view' : {
                left: 'event-calendar-view',
                right: null,
                canleft: true,
                canright: false,
            },
            'location-list-view' : {
                left: 'location-category-view',
                right: null,
                canleft: true,
                canright: false,
            },
            'location-single-view' : {
                left: 'location-list-view',
                right: null,
                canleft: true,
                canright: false,
            },
        };

        // Gets event data
        Globals.eventDataHandler = new EventDataHandler();
        Globals.eventDataHandler.getFutureEvents( 24, true ).then((resp) => {

            // Converts to jsx elements
            let events = [];
            resp.forEach(( item, index ) => {
                events.push( <Event elem={ item } key={ 'event-' + item.fbid } setMainState={ this.parsedSetState.bind(this) } /> )
            });

            this.setState({
                'eventsData' : resp,
                'jsxEvents' : events,
            });

        });

        // Gets category data
        Globals.categoryDataHandler = new CategoryDataHandler();
        Globals.categoryDataHandler.getFeaturedCategories().then((resp) => {
            this.setState({
                'featuredCategoriesData' : resp,
            });
        });

        Globals.categoryDataHandler.getAllCategories(false, true).then(( resp ) => {

            let categoriesData = [];
            for (let category of resp){
                if (category.location_count > 2){
                    categoriesData.push(category);
                }
            }

            this.setState({
                'categoriesData' : categoriesData,
            });
        });

        // Set main state
        Globals.setMainState = this.parsedSetState.bind(this);
    }

    // Handle anchor click
    handleAnchorClick( e ) {
        if ( _([this]).attr('href') === '#' ||
             _([this]).hasAttr('data-prevent') )
            e.preventDefault();
    }

    // ParsedSetState
    parsedSetState( key, value ) {
        if ( typeof key !== 'object' ) {
            this.state[ key ] = value;
            this.forceUpdate();
        } else {
            this.setState(key);
        }
    }

    // After render
    componentDidUpdate() {
        document.body.classList.remove('loading');

        // Handle anchor click
        _('a').off( 'click', this.handleAnchorClick );
        _('a').on( 'click', this.handleAnchorClick );


        _('body').removeClass('loading');
        _('body').addClass('loaded');
    }

    // Component did mount
    componentDidMount() {
_('body').removeClass('loading');
        _('body').addClass('loaded');

        Globals.user = new User();
        this.viewSlider = new ViewSlider();

        _( '.nav-locations' ).on( 'click', () => {

            if ( _('.search-nav-container .bookmark-mode') !== false )
                _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

            _('.nav-elem').removeClass('bookmark-mode');
            _( '.nav-locations' ).addClass('bookmark-mode');
            if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

            if(_('body').hasClass('mobile')){
                Globals.viewHandler.changeMobileViewFocus(
                    '#location-category-view',
                    false, true
                );
            }

            else{
                Globals.viewHandler.changeViewFocus(
                    Globals.viewHandler.focusedViews[0],
                    '#location-category-view',
                    true, false, false
                );
            }

            Globals.history.push({'type' : 'home', 'name' : 'Steder · Towwwn'});
        });

        _( '.nav-events' ).on( 'click', () => {
            if ( _('.category.bookmark-mode') !== false ) _('.category.bookmark-mode').removeClass('bookmark-mode');

            if ( _('.search-nav-container .bookmark-mode') !== false )
                _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

            _('.nav-elem').removeClass('bookmark-mode');
            _( '.nav-events' ).addClass('bookmark-mode');
            if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

             if(_('body').hasClass('mobile')){
                Globals.viewHandler.changeMobileViewFocus(
                    '#event-calendar-view',
                    true, false
                );
            }

            else{
                Globals.viewHandler.changeViewFocus(
                    '#event-calendar-view',
                    Globals.viewHandler.focusedViews[1],
                    false, true, false
                );
            }

            Globals.history.push({'type' : 'home', 'name' : 'Begivenheder · Towwwn'});

        });

        _( '.nav-search' ).on( 'click', () => {

            if ( _('.search-nav-container .bookmark-mode') !== false )
                _('.search-nav-container .bookmark-mode').removeClass('bookmark-mode');

            _('.nav-elem').removeClass('bookmark-mode');
            _( '.nav-search' ).addClass('bookmark-mode');
            if ( _('.search-inactive') !== false ) _('.search-inactive').removeClass('search-inactive');

            if(_('body').hasClass('mobile')){
                Globals.viewHandler.changeMobileViewFocus(
                    '#search-view',
                    true, false
                );
            }

            else{
                Globals.viewHandler.changeViewFocus(
                    '#search-view',
                    Globals.viewHandler.focusedViews[0],
                    true, false, false
                );
            }

            // Focus search bar (if not mobile)
            if(!_('body').hasClass('mobile')){
                document.getElementById('search-bar').focus();
            }

            Globals.history.push({'type' : 'home', 'name' : 'Søg · Towwwn'});
        });

        Globals.viewHandler = null;

        // Render 404
        if ( app_data.type == '404' || app_data.id == null){
            Globals.viewHandler = new ViewHandler('#event-calendar-view', '#location-category-view', '#event-calendar-view');
        }

        // Render Front page
        if ( app_data.type == 'page' || app_data.type == 'post' ){
            Globals.viewHandler = new ViewHandler('#event-calendar-view', '#location-category-view', '#event-calendar-view');
            Globals.history.replace({'type' : 'home', 'name' : 'Towwwn'});
        }

        // Render single event
        if ( app_data.type == 'event' && app_data.id != null ){
            Globals.viewHandler = new ViewHandler('#event-single-view', '#event-calendar-view', '#event-single-view');

            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                let singleEvent = JSON.parse( data.target.response );
                Globals.setMainState( {'singleevent': singleEvent[0]});
                Globals.history.replace(singleEvent[0]);
            });

            request.open( 'GET', app_data.rest_api + '/events/' + app_data.id );
            request.send();

        }

        // Render category list
        if( app_data.type == 'category' ){
            Globals.viewHandler = new ViewHandler('#location-category-view', '#location-list-view', '#location-list-view');

            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                let category = JSON.parse( data.target.response );
                Globals.history.replace(category);
                Globals.locationDataHandler.getCategorySpecificLocation( category.category_id ).then(( resp ) => {
                    Globals.setMainState({
                        'currentLocationsCategory' : category,
                        'currentLocations' : resp,
                    });
                });

            });

            request.open( 'GET', app_data.rest_api + '/categories/' + app_data.id );
            request.send();
        }

        // Render single location
        if ( app_data.type == 'location' && app_data.id != null ){

            Globals.viewHandler = new ViewHandler('#location-list-view', '#location-single-view', '#location-single-view');

            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                let singleLocation = JSON.parse( data.target.response );
                Globals.setMainState( {'singleLocation' : singleLocation[0]});
                Globals.history.replace(singleLocation[0]);

                Globals.locationDataHandler.getCategorySpecificLocation( singleLocation[0].categories[0].category_id ).then(( resp ) => {
                    Globals.setMainState({
                        'currentLocationsCategory' : singleLocation[0].categories[0],
                        'currentLocations' : resp,
                    });
                });

            });

            request.open( 'GET', app_data.rest_api + '/locations/' + app_data.id );
            request.send();
        }

        // Handle anchor click
        _('a').off( 'click', this.handleAnchorClick );
        _('a').on( 'click', this.handleAnchorClick );
    }

    // Render
    render() {
        return (
            <div className="content-container" id="page-content">
                <div className="content-container-inner">
                    <SearchView />
                    <SearchResultView result={ this.state.searchResult } />

                    <EventSingleView name="event-single-view" from={ this.state.from } event={ this.state.singleevent } setMainState={ this.parsedSetState.bind(this) } />
                    <EventCalendarView name="event-calendar-view" from={ this.state.from } events={ this.state.jsxEvents } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationCategoryView name="location-category-view" from={ this.state.from } categories={ this.state.featuredCategoriesData } allCategories={ this.state.categoriesData } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationListView name="location-list-view" from={ this.state.from } elems={ this.state.currentLocations } category={ this.state.currentLocationsCategory } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationSingleView name="location-single-view" from={ this.state.from } elem={ this.state.singleLocation } setMainState={ this.parsedSetState.bind(this) } />
                </div>
                <CookiePolicy name="towwwn-cookie"/>
            </div>
        );
    }

} module.exports = TowwwnApp;
