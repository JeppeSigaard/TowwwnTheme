

// Event single view layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
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
                'leftview' : '#location-list-view',
                'rightview' : '#location-single-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
                mobile: {
                    view : '#location-single-view',
                    fromLeft : true,
                    fromRight : false,
                }
            },

            'vref' : {
                'leftview' : '#location-single-view',
                'rightview' : '#event-single-view',
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
            this.lastElem = nextProps.event;
        }

        if ( nextProps.from === 'location-single-view' ) {
            Globals.relations[ nextProps.name ].canleft = true;
            Globals.relations[ nextProps.name ].canright = false;
            this.setState({ closeviewstate : this.state.fromlocationclose });
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
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">

                            { this.state.jsxEvent != null &&
                              this.state.jsxEvent }

                            <BannerCommercials />
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventSingleView;
