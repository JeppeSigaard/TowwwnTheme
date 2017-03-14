

// Location List View
const React = require( 'react' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Location = require( '../components/location.js' );

class LocationListView extends React.Component {
    
    // Ctor
    constructor() { 
        super();
        this.state = {
            'closeviewstate' : {
                'leftview' : 'event-calendar-view',
                'rightview' : 'location-category-view',
                'fromLeft' : true,
                'fromRigth' : false,
            },
        };
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.elems != null ) {
            let jsxElems = [];
            for ( let elem of nextProps.elems ) {
                jsxElems.push( <Location elem={ elem } /> );
            } this.setState({ 'jsxLocations' : jsxElems });
        }
    }
    
    // Render
    render() {
        return (
            <section className="container-section" id="location-list-view">
                <div className="sync-outer">
                    <div className="sync-inner">
                        <div className="content">
                            { this.props.category != null && 
                                <ViewTopBar closeviewstate={ this.state.closeviewstate } title={ this.props.category.category_name } darken={ true } standard={ true } />
                            }
                            
                            <div className="location-list" >
                                { this.state.jsxLocations != null && this.state.jsxLocations }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    
} module.exports = LocationListView;