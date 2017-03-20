

// Event single view layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      SingleEvent = require( '../components/singleEvent.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' );

class EventSingleView extends React.Component {

    // Ctor
    constructor() { 
        super(); 
        
        this.state = {
            'closeviewstate' : { },

            'standardclose' : {
                'leftview' : 'event-calendar-view',
                'rightview' : 'location-category-view',
                'fromLeft' : false,
                'fromRight' : true,
                'notrans': false,
            },

            'fromlocationclose' : {
                'leftview' : 'location-list-view',
                'rightview' : 'location-single-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
            },

            'vref' : {
                'leftview' : 'location-single-view',
                'rightview' : 'event-single-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
            },

            jsxEvent : null,
        };
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        console.log( nextProps.from );
        if ( nextProps.from === 'location-single-view' ) {
            this.setState({ closeviewstate : this.state.fromlocationclose });
        } else {
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
            console.log( data[0] );
            Globals.setMainState({
                'singleLocation' : data[0],
            });
        });

        request.open( 'GET', 'http://towwwn.dk/api/svendborg/locations/'+this.props.event.parentid );
        request.send();

    }

    // Render
    render() {
        let elem = this.props.event;
        return (
            <section className="container-section" id="event-single-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <ViewTopBar standard={ true } title={ elem != null ? elem.parentname : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } vref={ this.state.vref } willChangeView={ this.willChangeView.bind(this) } name={ this.props.name } />
                            
                            { this.state.jsxEvent != null &&
                              this.state.jsxEvent }
                              
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventSingleView;
