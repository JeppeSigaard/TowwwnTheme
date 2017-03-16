
// Main page for the towwwn app
require( '../../modules/tools/textPreproccesors.js' );
const React = require( 'react' ),
    Globals = require( '../globals.js' ),
      
    // Data Handlers
    EventDataHandler = require( '../../modules/handlers/dataHandlers/eventDataHandler.js' ),
    CategoryDataHandler = require( '../../modules/handlers/dataHandlers/categoryDataHandler.js' ),
    LocationDataHandler = require( '../../modules/handlers/dataHandlers/locationDataHandler.js' ),

    // Views
    EventSingleView = require( '../views/eventSingleView.js' ),
    EventCalendarView = require( '../views/eventCalendarView.js' ),
    LocationCategoryView = require( '../views/locationCategoryView.js' ),
    LocationListView = require( '../views/locationListView.js' ),
    LocationSingleView = require( '../views/locationSingleView.js' ),

    // Components
    Event = require( '../components/event.js' ),
    LocationCategory = require( '../components/locationCategory.js' ),

    // Plugins
    SyncScrollHandler = require( '../../modules/plugins/syncScrollHandler.js' ),
    Slider = require( '../../modules/plugins/slider.js' ),
    ViewHandler = require( '../../modules/handlers/viewHandler.js' ),
    EventHandlers = require( '../../modules/handlers/eventHandlers.js' ),
    ImageHandler = require( '../../modules/handlers/imageHandler.js' ),

    // TMP
    SingleEvent = require( '../components/singleEvent.js' );

// Polyfills
require ('sticky-position');

class TowwwnApp extends React.Component {

    // Ctor
    constructor() {
        super();
        
        // Instances
        this.imageHandler = new ImageHandler();
        this.eventHandlers = new EventHandlers();
        
        // Globals
        Globals.syncScroll = new SyncScrollHandler();
        Globals.viewHandler = null;
        Globals.locationDataHandler = new LocationDataHandler();
        
        this.hasMounted = false;
        this.state = { from: null };

        // Gets event data
        Globals.eventDataHandler = new EventDataHandler();
        Globals.eventDataHandler.getFutureEvents( 25, true ).then((resp) => {

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
        let categoryData = new CategoryDataHandler();
        categoryData.getFeaturedCategories().then((resp) => {

            // Converts to JSX elements
            let categories = [];
            resp.forEach(( item, index ) => {
                categories.push( <LocationCategory elem={ item } key={ 'category-' + item.category_id } setMainState={ this.parsedSetState.bind(this) } /> );
            });

            this.setState({
                'futureCategoriesData' : resp,
                'jsxCategories' : categories,
            });

        });
        
        categoryData.getAllCategories().then(( resp ) => {
            this.setState({
                'categoriesData' : resp,
            });
        });
        
        // Set main state
        Globals.setMainState = this.parsedSetState.bind(this);

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
        if ( Globals.viewHandler === null ) Globals.viewHandler = new ViewHandler( this.syncScroll );
        Globals.syncScroll.wrapElems();
        Globals.syncScroll.rescaleContainer( Globals.viewHandler.focusedViews );
    }

    // Render
    render() {
        return (
            <div className="content-container" id="page-content">
                <div className="content-container-inner">
                    <EventSingleView name="event-single-view" from={ this.state.from } event={ this.state.singleevent } setMainState={ this.parsedSetState.bind(this) } />
                    <EventCalendarView name="event-calendar-view" from={ this.state.from } events={ this.state.jsxEvents } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationCategoryView name="location-category-view" from={ this.state.from } categories={ this.state.jsxCategories } allCategories={ this.state.categoriesData } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationListView name="location-list-view" from={ this.state.from } elems={ this.state.currentLocations } category={ this.state.currentLocationsCategory } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationSingleView name="location-single-view" from={ this.state.from } elem={ this.state.singleLocation } setMainState={ this.parsedSetState.bind(this) } />
                </div>
            </div>
        );
    }

} module.exports = TowwwnApp;
