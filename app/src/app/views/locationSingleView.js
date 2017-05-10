

// Location Single view
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      SingleLocation = require( '../components/singleLocation.js' ),
      BannerCommercials = require( '../components/bannerCommercials.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Loader = require( '../componentParts/loader.js' );

class LocationSingleView extends React.Component{

    // Ctor

    constructor() {
        super();
        this.startTime = 0;
        this.lastElem = null;

        // Standard close properties
        this.standardclose = {
            leftview: '#location-list-view',
            rightview: '#location-category-view',
            fromLeft: true,
            fromRight: false,
            mobile: {
                view: '#location-list-view',
                fromLeft: true,
                fromRight: false,
            }
        };

        // Close properties when coming from event
        this.fromeventclose = {
            leftview: '#event-calendar-view',
            rightview: '#event-calendar-view',
            fromLeft: false,
            fromRight: true,
            mobile: {
                view: '#event-single-view',
                fromLeft: false,
                fromRight: true,
            }
        };

        // From search close
        this.fromsearchclose = {
            leftview : '#search-view',
            rightview : '#search-results-view',
            fromLeft : true,
            fromRight: true,
            mobile : {
                view : '#search-results-view',
                fromLeft : true,
                fromRight : false
            }
        };

        // Close properties when coming from calendar
        this.fromeventCalendarclose = {
            leftview: '#location-category-view',
            rightview: '#event-calendar-view',
            fromLeft: false,
            fromRight: true,
            mobile: {
                view: '#event-calendar-view',
                fromLeft: false,
                fromRight: true,
            }
        };

        // State
        this.state = {
            closeviewstate: this.standardclose,
        };

    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.elem != this.lastElem ) {

            BehaviourDataHandler.parseData( 'location', nextProps.elem );
            this.lastElem = nextProps.elem;

            if ( this.props.elem != null ) {
                BehaviourDataHandler.parseTimeData( 'location', this.props.elem.id, new Date().getTime() - this.startTime );
            } this.startTime = new Date().getTime();
        }

        // Sets close state
        if ( nextProps.from === 'event-single-view' ) {

            Globals.relations[ nextProps.name ].canright = true;
            Globals.relations[ nextProps.name ].canleft = false;

            this.setState({
                closeviewstate : this.fromeventclose,
            });

        } else if ( nextProps.from === 'event-calendar-view' ) {

            Globals.relations[ nextProps.name ].canright = false;
            Globals.relations[ nextProps.name ].canleft = false;

            this.setState({
                closeviewstate : this.fromeventCalendarclose,
            });

        } else if ( nextProps.from === 'search-results-view' ) {

            Globals.relations[ nextProps.name ].canright = false;
            Globals.relations[ nextProps.name ].canleft = true;

            this.setState({
                closeviewstate : this.fromsearchclose,
            });

        } else {

            Globals.relations[ nextProps.name ].canright = false;
            Globals.relations[ nextProps.name ].canleft = true;

            this.setState({
                closeviewstate : this.standardclose,
            });

        }

    }

    // Component did mount
    componentDidMount() {
        this.lazyLoad = new LazyLoadHandler( '#location-single-view .scroll-container' );
    }

    // Component did update
    componentDidUpdate() {
        if ( this.props.elem != null ) {
            this.lazyLoad.triggerload();
        }
    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-single-view">
                <ViewTopBar standard={ true } title={ this.props.elem != null ? this.props.elem.name : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } name={ this.props.name } />
                <div className="scroll-container">
                    <div className="content">
                        { this.props.elem != null &&
                            <SingleLocation elem={ this.props.elem } name={ this.props.name } /> }
                        { this.props.elem == null &&
                            <Loader /> }

                        <BannerCommercials />
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationSingleView;
