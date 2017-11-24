
// Main page for the towwwn app
require( '../../modules/tools/textPreproccesors.js' );
const React = require( 'react' ),
    Globals = require( '../globals.js' ),

    // Data Handlers
    User = require( '../../modules/handlers/dataHandlers/userDataHandler.js' ),
    EventDataHandler = require( '../../modules/handlers/dataHandlers/eventDataHandler.js' ),
    CategoryDataHandler = require( '../../modules/handlers/dataHandlers/categoryDataHandler.js' ),
    LocationDataHandler = require( '../../modules/handlers/dataHandlers/locationDataHandler.js' ),
    CommercialDataHandler = require( '../../modules/handlers/dataHandlers/commercialDataHandler.js' ),

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
    CookiePolicy = require('../components/cookiePolicy.js'),

    // Plugins
    _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
    ViewHandler = require( '../../modules/handlers/viewHandler.js' ),
    ViewSlider = require( '../../modules/libaries/viewslider.js' ),
    EventHandlers = require( '../../modules/handlers/eventHandlers.js' ),
    historyHandler = require('../../modules/handlers/historyHandler.js'),

    // TMP
    SingleEvent = require( '../components/singleEvent.js' );

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
        if ( _(window).width() <= 769 ) _('body').addClass('mobile');

        // Instances
        this.eventHandlers = new EventHandlers();

        // Globals
        Globals.viewHandler = null;
        Globals.locationDataHandler = new LocationDataHandler();
        Globals.CommercialDataHandler = new CommercialDataHandler();
        Globals.fb = new FBHandler();
        Globals.user = new User();
        Globals.history = new historyHandler();

        this.state = { from: null, currentView: null, navelems: [], hamburger : null };
        this.hasMounted = false;

        // Relations
        Globals.relations = {
            'search-view' : {
                left: null,
                right: 'event-calendar-view',
                canleft: false,
                canright: true,
            },
            'event-single-view' : {
                left: null,
                right: 'event-calendar-view',
                canleft: false,
                canright: true,
            },
            'event-calendar-view' : {
                left: 'search-view',
                right: 'location-category-view',
                canleft: true,
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


        // Gets category data
        Globals.categoryDataHandler = new CategoryDataHandler();
        /*
        Globals.categoryDataHandler.getFeaturedCategories().then((resp) => {
            this.setState({
                'featuredCategoriesData' : resp,
            });
        });
        */

        Globals.categoryDataHandler.getAllCategories(false, true, {orderby : 'name', order : 'ASC'}).then(( resp ) => {
            let categoriesData = [];
            for (let category of resp){
                if (category.location_count > 2){
                    categoriesData.push(category);
                }
            }

            this.setState({
                // 'categoriesData' : categoriesData,
                'featuredCategoriesData' : resp,
            });
        });

        // Set main state
        Globals.setMainState = this.parsedSetState.bind(this);

        Globals.hooks.add('toggle-hamburger', () => {
            this.setState({hamburger : (this.state.hamburger === true) ? false : true});
        });
    }

    // Handle anchor click
    handleAnchorClick( e ) {
        if ( _([this]).attr('href') === '#' ||
             _([this]).hasAttr('data-prevent') )
            e.preventDefault();
    }

    // ParsedSetState
    parsedSetState( key, value, cb ) {
        if ( typeof key !== 'object' ) {
            this.state[ key ] = value;
            this.forceUpdate();
        } else {
            this.setState(key);
        }

        if(typeof cb === 'function') cb();
    }

    toggleHamburger(){
        Globals.hooks.trigger('toggle-hamburger');
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

        this.viewSlider = new ViewSlider();
        Globals.viewHandler = null;

        // Render 404
        if ( app_data.type == '404' || app_data.id == null) {
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

                if(singleLocation[0].categories == null){
                    Globals.viewHandler.changeViewFocus('#location-single-view', '#location-category-view');
                }

                else{
                Globals.locationDataHandler.getCategorySpecificLocation( singleLocation[0].categories[0].category_id ).then(( resp ) => {
                    Globals.setMainState({
                        'currentLocationsCategory' : singleLocation[0].categories[0],
                        'currentLocations' : resp,
                    });
                });
                }
            });

            request.open( 'GET', app_data.rest_api + '/locations/' + app_data.id );
            request.send();
        }

        // yups
        _( '.nav-search' ).on( 'click', () => {
        });

        // Handle anchor click
        _('a').off( 'click', this.handleAnchorClick );
        _('a').on( 'click', this.handleAnchorClick );

        _('body').removeClass('loading');
        _('body').addClass('loaded');
    }

    // Render
    render() {

        let container_inner_class = 'content-container-inner',
            overlay_class = 'general-overlay',
            towwwn_class = 'towwwn-app';

        if(this.state.hamburger != null && this.state.hamburger){
            container_inner_class += ' aside';
            overlay_class += ' active';
            towwwn_class += ' hamburger-active';
        }

        return (
            <div className={towwwn_class}>
                <Header />
                <div className="content-container" id="page-content">
                    <div className={container_inner_class}>
                        <div id='general-overlay' className={overlay_class} onClick={this.toggleHamburger.bind(this)}></div>

                        {/*<SearchView />
                        <SearchResultView result={ this.state.searchResult } />
                        <UserView from={ this.state.from } />*/}

                        <EventSingleView name="event-single-view" from={ this.state.from } event={ this.state.singleevent } setMainState={ this.parsedSetState.bind(this) } />
                        <EventCalendarView name="event-calendar-view" from={ this.state.from } events={ this.state.jsxEvents } setMainState={ this.parsedSetState.bind(this) } />
                        <LocationCategoryView name="location-category-view" from={ this.state.from } categories={ this.state.featuredCategoriesData } allCategories={ this.state.categoriesData } setMainState={ this.parsedSetState.bind(this) } />
                        <LocationListView name="location-list-view" from={ this.state.from } elems={ this.state.currentLocations } category={ this.state.currentLocationsCategory } setMainState={ this.parsedSetState.bind(this) } />
                        <LocationSingleView name="location-single-view" from={ this.state.from } elem={ this.state.singleLocation } setMainState={ this.parsedSetState.bind(this) } />
                    </div>

                    <Hamburger />

                    { this.state.currentMobileView != null &&
                      _('body').hasClass('mobile') &&
                        <ViewSliderDots currentView={ this.state.currentMobileView } /> }

                </div>
                <CookiePolicy name="towwwn-cookie"/>
            </div>
        );
    }

} module.exports = TowwwnApp;
