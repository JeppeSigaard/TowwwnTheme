

// Location List View
const React = require( 'react' ),
      LazyLoadHandler = require( '../../modules/handlers/lazyLoadHandler.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      Location = require( '../components/location.js' ),
      Loader = require( '../componentParts/loader.js' );

class LocationListView extends React.Component {

    // Ctor
    constructor() {
        super();

        this.lastElem = null;
        this.state = {
            'closeviewstate' : {
                'leftview' : '#event-calendar-view',
                'rightview' : '#location-category-view',
                'fromLeft' : true,
                'fromRigth' : false,
                mobile: {
                    view: '#location-category-view',
                    fromLeft: true, fromRight: false,
                }
            },
        };
    }

    // On close
    onClose() { _( '.category.bookmark-mode' ).removeClass('bookmark-mode'); }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.category != this.lastElem ) {
            this.lastElem = nextProps.category;
        }

        if ( nextProps.elems != null ) {
            let jsxElems = [];
            for ( let elem of nextProps.elems ) {
                jsxElems.push( <Location key={ 'location-'+elem.id } elem={ elem } setMainState={ nextProps.setMainState } /> );
            } this.setState({ 'jsxLocations' : jsxElems });
        } else {
            this.setState({ 'jsxLocations' : null });
        }
    }

//    // Component did mount
//    componentDidMount() {
//        this.lazyLoad = new LazyLoadHandler( '#location-list-view .scroll-container' );
//    }
//
//    // Component did update
//    componentDidUpdate() {
//        if ( this.state.jsxLocations != null ) {
//            this.lazyLoad.triggerload();
//        }
//    }

    // Render
    render() {
        return (
            <section className="container-section" id="location-list-view">
               { this.props.category != null &&
                    <ViewTopBar closeviewstate={ this.state.closeviewstate } title={ this.props.category.category_name } darken={ true } standard={ true } name={ this.props.name } />
                }

                <div className="scroll-container">
                    <div className="content">
                        <div className="location-list" >
                            { this.state.jsxLocations != null && this.state.jsxLocations }
                            { this.state.jsxLocations == null && <Loader /> }
                        </div>
                    </div>
                </div>
            </section>
        );
    }

} module.exports = LocationListView;
