
// Main page for the towwwn app
require( '../../modules/tools/textPreproccesors.js' );
const React = require( 'react' ),
    EventDataHandler = require( '../../modules/handlers/dataHandlers/eventDataHandler.js' ),
    CategoryDataHandler = require( '../../modules/handlers/dataHandlers/categoryDataHandler.js' ),

    // Views
    EventCalendarView = require( '../views/eventCalendarView.js' ),
    LocationCategoryView = require( '../views/locationCategoryView.js' ),

    // Components
    Event = require( '../components/event.js' ),
    LocationCategory = require( '../components/locationCategory.js' ),

    // Plugins
    SyncScrollHandler = require( '../../modules/plugins/syncScrollHandler.js' ),
    ImageHandler = require( '../../modules/handlers/imageHandler.js' );

// Polyfills
require ('sticky-position');

class TowwwnApp extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = { };
        this.imageHandler = new ImageHandler();
        this.syncScroll = new SyncScrollHandler();
        this.hasMounted = false;

        // Gets event data
        let eventData = new EventDataHandler();
        eventData.getFutureEvents().then((resp) => {

            // Converts to jsx elements
            let events = [];
            resp.splice( 0, 50 ).forEach(( item, index ) => {
                events.push( <Event elem={ item } key={ item.fbid } /> )
            }); this.setState({ 'events' : events });

        });

        // Gets category data
        let categoryData = new CategoryDataHandler();
        categoryData.getFeaturedCategories().then((resp) => {

            // Converts to JSX elements
            let categories = [];
            resp.forEach(( item, index ) => {
                categories.push( <LocationCategory elem={ item } key={ item.fbid } /> );
            }); this.setState({ 'categories' : categories });

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
                    <EventCalendarView events={ this.state.events } />
                    <LocationCategoryView categories={ this.state.categories } />
                </div>
            </div>
        );
    }

} module.exports = TowwwnApp;
