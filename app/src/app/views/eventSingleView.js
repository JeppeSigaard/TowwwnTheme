

// Event single view layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      SingleEvent = require( '../components/singleEvent.js' ),
      BannerCommercials = require( '../components/bannerCommercials.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' );

class EventSingleView extends React.Component {

    // Ctor
    constructor() {
        super();

        this.lastElem = null;
        this.startTime = null;
        this.state = {
            'closeviewstate' : { },

            'standardclose' : {
                'leftview' : '#event-calendar-view',
                'rightview' : '#location-category-view',
                'fromLeft' : false,
                'fromRight' : true,
                'notrans': false,
                mobile: {
                    view : '#event-calendar-view',
                    fromLeft : false,
                    fromRight : true,
                }
            },

            'fromlocationclose' : {
                'leftview' : '#location-single-view',
                'rightview' : '#location-list-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
                mobile: {
                    view : '#location-single-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            'fromsearchclose' : {
                'leftview' : '#search-view',
                'rightview' : '#search-results-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
                'ignoreAutoDirection': true,
                mobile: {
                    view : '#search-results-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            'vref' : {
                'leftview' : '#event-single-view',
                'rightview' : '#location-single-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans' : false,
                mobile : {
                    view : '#location-single-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            jsxEvent : null,
        };
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.event != this.lastElem ) {
            BehaviourDataHandler.parseData( 'event', nextProps.event );
            this.lastElem = nextProps.event;

            if ( this.props.event != null ) {
                BehaviourDataHandler.parseTimeData( 'event', this.props.event.id, new Date().getTime()  -this.startTime, this.props.event.parentid );
            } this.startTime = new Date().getTime();
        }

        if ( nextProps.from === 'location-single-view' ) {
            Globals.relations[ nextProps.name ].canleft = true;
            Globals.relations[ nextProps.name ].canright = false;
            this.setState({ closeviewstate : this.state.fromlocationclose });
        } else if ( nextProps.from === 'search-results-view' ) {
            Globals.relations[ nextProps.name ].canleft = true;
            Globals.relations[ nextProps.name ].canright = false;
            this.setState({ closeviewstate : this.state.fromsearchclose });
        } else {
            Globals.relations[ nextProps.name ].canleft = false;
            Globals.relations[ nextProps.name ].canright = true;
            this.setState({ closeviewstate : this.state.standardclose });
        }

        if ( nextProps.event != null ) {
            this.setState({
                'jsxEvent' : <SingleEvent elem={ nextProps.event } />,
            });
        }
    }

    // Will change view
    willChangeView() {

        Globals.setMainState({ singleLocation : null });

        // Opens new request
        let request = new XMLHttpRequest();
        request.addEventListener( 'load', ( resp ) => {
            let data = JSON.parse( resp.target.response );
            Globals.setMainState({
                'singleLocation' : data[0],
            });
        });

        request.open( 'GET', app_data.rest_api + 'svendborg/locations/'+this.props.event.parentid );
        request.send();
    }

    // Render
    render() {
        let elem = this.props.event;
        return (
            <section className="container-section" id="event-single-view">
                <ViewTopBar standard={ true } clickable={ true } title={ elem != null ? elem.parentname : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } vref={ this.state.vref } willChangeView={ this.willChangeView.bind(this) } name={ this.props.name } />

                <div className="scroll-container">
                    <div className="content">

                        { this.state.jsxEvent != null &&
                          this.state.jsxEvent }

                        <BannerCommercials />
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventSingleView;
