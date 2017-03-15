

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
            'closeviewstate' : {
                'leftview' : 'event-calendar-view',
                'rightview' : 'location-category-view',
                'fromLeft' : false,
                'fromRight' : true,
                'notrans': false,
            },
            'vref' : {
                'leftview' : 'location-single-view',
                'rightview' : 'event-single-view',
                'fromLeft' : true,
                'fromRight' : false,
                'notrans': false,
            },
        };
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( this.props.event != null ) {
            this.state.jsxEvent = null;
            this.setState({
                'jsxEvent' : <SingleEvent elem={ this.props.event } />
            });
        }
    }

    // Render
    render() {
        let elem = this.props.event;
        return (
            <section className="container-section" id="event-single-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <ViewTopBar standard={ true } title={ elem != null ? elem.parentname : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } vref={ this.state.vref } name={ this.props.name } />
                               
                            {/* Renders events */}
                            { this.state.jsxEvent != null &&
                              this.state.jsxEvent }
                              
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = EventSingleView;
