

// Location Single view
const React = require( 'react' ),
      SingleLocation = require( '../components/singleLocation.js' ),
      BannerCommercials = require( '../components/bannerCommercials.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Loader = require( '../componentParts/loader.js' );

class LocationSingleView extends React.Component{
    
    // Ctor
    constructor() { 
        super(); 
        
        // Standard close properties
        this.standardclose = {
            leftview: 'location-category-view',
            rightview: 'location-list-view',
            fromLeft: true,
            fromRight: false,
        };
        
        // Close properties when coming from event
        this.fromeventclose = {
            leftview: 'event-single-view',
            rightview: 'event-calendar-view',
            fromLeft: false,
            fromRight: true,
        };
        
        // CLose properties when coming from calendar
        this.fromeventCalendarclose = {
            leftview: 'event-calendar-view',
            rightview: 'location-category-view',
            fromLeft: false,
            fromRight: true,
        };

        // State
        this.state = {
            closeviewstate: this.standardclose, 
        };
        
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        console.log( nextProps.elem );
        
        // Sets close state
        if ( nextProps.from === 'event-single-view' ) {
            this.setState({
                closeviewstate : this.fromeventclose,
            });
        } else if ( nextProps.from === 'event-calendar-view' ) {
            this.setState({
                closeviewstate : this.fromeventCalendarclose,
            });
        } else {
            this.setState({
                closeviewstate : this.standardclose,
            });
        }
        
    }
    
    // Render
    render() {
        return (
            <section className="container-section" id="location-single-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            <ViewTopBar standard={ true } title={ this.props.elem != null ? this.props.elem.name : 'Indlæser..' } closeviewstate={ this.state.closeviewstate } name={ this.props.name } />
                            
                            { this.props.elem != null &&
                                <SingleLocation elem={ this.props.elem } name={ this.props.name } /> }
                            { this.props.elem == null &&
                                <Loader /> }

                            <BannerCommercials />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
} module.exports = LocationSingleView;
