

// Search Result View
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' ),
      Header  = require( '../componentParts/sectionHeader.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Event = require( '../components/event.js' ),
      Location = require( '../components/location.js' ),
      ScrollContainer  = require( '../componentParts/scrollContainer.js' ),
      Loader = require( '../componentParts/loader.js' );

class SearchResultView extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = {
            closeviewstate : {
                leftview : '#event-calendar-view',
                rightview : '#location-category-view',
                fromLeft : false,
                fromRight : true,
                ignoreAutoDirection: true,
                mobile: {
                    view: '#search-view',
                    fromLeft: false,
                    fromRight: true,
                }
            },
            allJsxLocations: [],
            allJsxEvents: [],
            locationMoreText: 'Vis flere',
            eventMoreText: 'Vis flere'
        };

        this.eventVref = {
            leftView : '#search-results-view',
            rightView : '#event-single-view',
            fromLeft : false,
            fromRight : true,
            ignoreAutoDirection: true,
            mobile : {
                view : '#event-single-view',
                fromLeft : false,
                fromRight : false
            }
        };
    }

    // On close
    onClose() {
        if ( _( '.search-inactive' ) ) _('.search-inactive').removeClass('search-inactive');
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if(nextProps.result == 'loading'){
            this.setState({
                allJsxLocations: null,
                jsxLocations: null,
                allJsxEvents: null,
                jsxEvents: null,
                jsxLoader : <Loader/>
            });
        }

        else if ( nextProps.result != null && nextProps.result != this.state.result ) {
            this.setState({ jsxLoader: null });

            if ( nextProps.result.events.length === 0 && nextProps.result.locations.length === 0 ) {
                this.setState({ noResults: true });
            } else this.setState({ noResults: false });

                if ( nextProps.result.events.length === 0 && nextProps.result.locations.length === 0 ) {
                    this.setState({ noResults: true });
                } else this.setState({ noResults: false });

            if ( nextProps.result.locations != null ) {
                let jsxLocations = [];
                for ( let obj of nextProps.result.locations ) {
                    jsxLocations.push( <Location name="search-results-view" key={ 'search-location-'+obj.id } elem={ obj } /> );
                } this.setState({ jsxLocations: jsxLocations.slice(0,6), allJsxLocations: jsxLocations });
            }

            if ( nextProps.result.events != null ) {
                let jsxEvents = [];
                for ( let obj of nextProps.result.events ) {
                    jsxEvents.push( <Event name="search-results-view" vref={ this.eventVref } key={ 'search-event-'+obj.id } elem={ obj } /> );
                } this.setState({ jsxEvents : jsxEvents.splice(0,12), allJsxEvents : jsxEvents });
            }
        } else if (nextProps.result != this.state.result) {
            this.setState({
                allJsxLocations: null,
                jsxLocations: null,
                allJsxEvents: null,
                jsxEvents: null,
                jsxLoader: null,
            });
        }
    }

    // Show more events
    showMoreEvents() {
        if ( this.state.jsxEvents.length > 6 ) {
            this.setState({ jsxEvents: this.state.allJsxEvents.slice(0,6) });
            this.state.eventMoreText = 'Vis flere';
        } else {
            this.setState({ jsxEvents: this.state.allJsxEvents });
            this.state.eventMoreText = 'Vis mindre';
        }
    }

    // On location show more click
    locationOnClick( e ) {
        if ( this.state.jsxLocations.length > 4 ) {
            this.setState({ jsxLocations: this.state.allJsxLocations.slice(0,4) });
            this.state.locationMoreText = 'Vis flere';
        } else {
            this.setState({ jsxLocations: this.state.allJsxLocations });
            this.state.locationMoreText = 'Vis mindre';
        }
    }

    // Component did mount
    componentDidMount() {

    }

    // Render
    render() {
        return (
            <section className="container-section" id="search-results-view">
                <Header in="#search-results-view" for=".scroll-container">
                    <ViewTopBar icon="#icon-search" viewBox="0 0 32 32" standard={ true } title={ this.props.keyword == null ? 'Søgeresultater' : 'Søgeresultater: ' + this.props.keyword } onClose={ this.onClose.bind(this) } closeviewstate={ this.state.closeviewstate } name={ 'search-results-view' } />
                </Header>
                <ScrollContainer name="search-scroll-content">
                    <div className="content">

                        { this.state.jsxLoader != null &&
                            this.state.jsxLoader
                        }

                        { this.state.allJsxEvents != null && this.state.allJsxLocations.length > 0 &&
                            <div className="locations">
                                <div className="locations-title section-title">Steder</div>
                                { this.state.jsxLocations != null && this.state.jsxLocations }
                                { this.state.allJsxLocations != null && this.state.allJsxLocations.length > 4 &&
                                    <div className="show-more" onClick={ this.locationOnClick.bind(this) }>
                                        { this.state.locationMoreText }
                                    </div>
                                }
                            </div>
                        }

                        { this.state.allJsxEvents != null && this.state.allJsxEvents.length > 0 &&
                            <div className="events">
                                <div className="events-title section-title">Begivenheder</div>
                                <div className="events-container">{ this.state.jsxEvents != null && this.state.jsxEvents }</div>
                                { this.state.allJsxEvents != null && this.state.allJsxEvents.length > 6 &&
                                    <div className="show-more" onClick={ this.showMoreEvents.bind(this) }>
                                        { this.state.eventMoreText }
                                    </div>
                                }
                            </div>
                        }

                        { this.state.noResults &&
                            <div className="errormessage">
                                Ingen resultater ;(
                            </div>
                        }
                    </div>
                </ScrollContainer>
            </section>
        );
     }

} module.exports = SearchResultView;
