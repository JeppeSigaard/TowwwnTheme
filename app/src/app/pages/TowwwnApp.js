
// Main page for the towwwn app
require( '../../modules/tools/textPreproccesors.js' );
const React = require( 'react' ),
    Globals = require( '../globals.js' ),
      
    // Data Handlers
    EventDataHandler = require( '../../modules/handlers/dataHandlers/eventDataHandler.js' ),
    CategoryDataHandler = require( '../../modules/handlers/dataHandlers/categoryDataHandler.js' ),

    // Views
    EventSingleView = require( '../views/eventSingleView.js' ),
    EventCalendarView = require( '../views/eventCalendarView.js' ),
    LocationCategoryView = require( '../views/locationCategoryView.js' ),

    // Components
    Event = require( '../components/event.js' ),
    LocationCategory = require( '../components/locationCategory.js' ),

    // Plugins
    SyncScrollHandler = require( '../../modules/plugins/syncScrollHandler.js' ),
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
        this.syncScroll = new SyncScrollHandler();
        this.eventHandlers = new EventHandlers();
        Globals.viewHandler = null;
        
        this.hasMounted = false;
        this.state = { };

        // Gets event data
        let eventData = new EventDataHandler();
        eventData.getFutureEvents( 50, true ).then((resp) => {

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

    }
    
    // ParsedSetState
    parsedSetState( key, value ) {
        this.state[ key ] = value;
        this.forceUpdate();
    }
    
    // After render
    componentDidUpdate() {
        if ( Globals.viewHandler === null ) Globals.viewHandler = new ViewHandler( this.syncScroll );
        this.syncScroll.wrapElems();
        this.syncScroll.rescaleContainer( Globals.viewHandler.focusedViews );
    }

    // Render
    render() {
        return (
            <div className="content-container" id="page-content">
                <div className="content-container-inner">
                    <EventSingleView event={ this.state.singleevent } setMainState={ this.parsedSetState.bind(this) } />
                    <EventCalendarView events={ this.state.jsxEvents } setMainState={ this.parsedSetState.bind(this) } />
                    <LocationCategoryView categories={ this.state.jsxCategories } allCategories={ this.state.categoriesData } setMainState={ this.parsedSetState.bind(this) } />
                </div>
            </div>
        );
    }

} module.exports = TowwwnApp;
