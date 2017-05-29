
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
    UserView = require( '../views/userView.js' ),

    // Components
    Header = require( '../components/header.js' ),
    Event = require( '../components/event.js' ),
    LocationCategory = require( '../components/locationCategory.js' ),
    ViewSliderDots = require('../components/viewsliderdots.js'),
    Hamburger = require( '../components/hamburger.js' ),

    // Plugins
    _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
    Slider = require( '../../modules/libaries/slider.js' ),
    ViewHandler = require( '../../modules/handlers/viewHandler.js' ),
    ViewSlider = require( '../../modules/libaries/viewslider.js' ),
    EventHandlers = require( '../../modules/handlers/eventHandlers.js' ),

    // TMP
    SingleEvent = require( '../components/singleEvent.js' ),

    // Polyfills
    PositionSticky = require ('sticky-position');

// Automatic classes
const EffectHandler = require( '../../modules/handlers/effectHandler.js' );

(() => {

    // Move this somewhere else... RIGHT NOW!!!! :((
    Array.prototype.changeIndex = (( oldIndex, newIndex ) => {
        let elem = this[ oldIndex ];
        this.splice( oldIndex, 1 );
        this.splice( newIndex, 0, elem );
    });

})();

class TowwwnApp extends React.Component {

    // Ctor
    constructor() {
        super();
        
        // Checks if mobile
        if ( _(window).width() <= 640 ) _('body').addClass('mobile');
        
        // Instances
        this.eventHandlers = new EventHandlers();
        
        // Globals
        Globals.viewHandler = null;
        Globals.locationDataHandler = new LocationDataHandler();
        Globals.fb = new FBHandler();
        Globals.user = new User();
        
        this.hasMounted = false;
        this.state = { from: null, currentView: null, navelems: [] };
        Globals.navelemscopy = this.state.navelems;
        
        // Relations
        Globals.relations = {
            'event-single-view' : {
                left: 'location-single-view',
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
                right: 'event-single-view',
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
            this.setState({
                'categoriesData' : resp,
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
        if ( Globals.viewHandler === null ) Globals.viewHandler = new ViewHandler( );
        document.body.classList.remove('loading');

        // Handle anchor click
        _('a').off( 'click', this.handleAnchorClick );
        _('a').on( 'click', this.handleAnchorClick );

    }
    
    // Component did mount
    componentDidMount() {
        _('body').removeClass('loading');
        _('body').addClass('loaded');
        this.viewSlider = new ViewSlider();

        // Handle anchor click
        _('a').off( 'click', this.handleAnchorClick );
        _('a').on( 'click', this.handleAnchorClick );
    }

    // Render
    render() {
        return (
            <div>
                <Header />
                <div className="content-container" id="page-content">
                    <div className="content-container-inner">
                        <div id="general-overlay" ></div>

                        <SearchView />
                        <SearchResultView result={ this.state.searchResult } />
                        <UserView from={ this.state.from } />

                        <EventSingleView name="event-single-view" from={ this.state.from } event={ this.state.singleevent } setMainState={ this.parsedSetState.bind(this) } />
                        <EventCalendarView name="event-calendar-view" from={ this.state.from } events={ this.state.jsxEvents } setMainState={ this.parsedSetState.bind(this) } />
                        <LocationCategoryView name="location-category-view" from={ this.state.from } categories={ this.state.featuredCategoriesData } allCategories={ this.state.categoriesData } setMainState={ this.parsedSetState.bind(this) } />
                        <LocationListView name="location-list-view" from={ this.state.from } elems={ this.state.currentLocations } category={ this.state.currentLocationsCategory } setMainState={ this.parsedSetState.bind(this) } />
                        <LocationSingleView name="location-single-view" from={ this.state.from } elem={ this.state.singleLocation } setMainState={ this.parsedSetState.bind(this) } />
                    </div>

                    <Hamburger />

                    { this.state.currentMobileView != null &&
                      _('body').hasClass('mobile') &&
                        <ViewSliderDots currentView={ this.state.currentMobileView } />
                    }
                </div>
            </div>
        );
    }

} module.exports = TowwwnApp;
