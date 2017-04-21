

// Location List View
const React = require( 'react' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Location = require( '../components/location.js' ),
      Loader = require( '../componentParts/loader.js' );

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
                mobile: {
                    view: '#location-category-view',
                    fromLeft: true, fromRight: false,
                }
            },
        };
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.elems != null ) {
            let jsxElems = [];
            for ( let elem of nextProps.elems ) {
                jsxElems.push( <Location key={ 'location-'+elem.id } elem={ elem } setMainState={ nextProps.setMainState } /> );
            } this.setState({ 'jsxLocations' : jsxElems });
        } else {
            this.setState({ 'jsxLocations' : null });
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
                                <ViewTopBar closeviewstate={ this.state.closeviewstate } title={ this.props.category.category_name } darken={ true } standard={ true } name={ this.props.name } />
                            }

                            <div className="location-list" >
                                { this.state.jsxLocations != null && this.state.jsxLocations }
                                { this.state.jsxLocations == null && <Loader /> }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationListView;
