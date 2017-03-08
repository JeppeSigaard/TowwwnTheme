
// Main page for the towwwn app
require( '../../modules/tools/textPreproccesors.js' );
const React = require( 'react' ),
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
    ImageHandler = require( '../../modules/handlers/imageHandler.js' ),

    // TMP
    SingleEvent = require( '../components/singleEvent.js' );

// Polyfills
require ('sticky-position');

class TowwwnApp extends React.Component {

    // Ctor
    constructor() {
        super();
        this.imageHandler = new ImageHandler();
        this.syncScroll = new SyncScrollHandler();
        this.hasMounted = false;

        this.state = { };

        // Gets event data
        let eventData = new EventDataHandler();
        eventData.getFutureEvents().then((resp) => {

            // Converts to jsx elements
            let events = [];
            resp.splice( 0, 50 ).forEach(( item, index ) => {
                events.push( <Event elem={ item } key={ item.fbid } /> )
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
                categories.push( <LocationCategory elem={ item } key={ item.fbid } /> );
            });

            this.setState({
                'categoriesData' : resp,
                'jsxCategories' : categories,
            });

        });


    }

    // Render
    render() {
        setTimeout(function() {
            this.syncScroll.wrapElems();
            this.syncScroll.rescaleContainer();
        }.bind(this), 200);

        return (
            <div className="content-container" id="page-content">
                <div className="content-container-inner">
                    <EventSingleView event={ typeof this.state.eventsData !== 'undefined' &&
                                             this.state.eventsData !== null &&
                        ( <SingleEvent elem={ this.state.eventsData[0] } /> )} />

                    <EventCalendarView events={ this.state.jsxEvents } />
                    {/*<LocationCategoryView categories={ this.state.jsxCategories } />*/}
                </div>
            </div>
        );
    }

} module.exports = TowwwnApp;
