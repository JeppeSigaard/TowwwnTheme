

// Location Category
const React = require( 'react' ),
      Globals = require( '../globals.js' );

class LocationCategory extends React.Component {

    // Ctor
    constructor() { 
        super();               
    }
    
    // Handle click
    handleClick( e ) {
        e.preventDefault();
        this.props.setMainState({
            'currentLocationsCategory' : this.props.elem,
            'currentLocations' : null,
        });
        
        Globals.viewHandler.changeViewFocus(
            'location-category-view',
            'location-list-view',
            false, true, false
        );
        
        Globals.locationDataHandler.getCategorySpecificLocation( this.props.elem.category_id ).then(( resp ) => {
            this.props.setMainState({
                'currentLocations' : resp,
            });
        });
    }

    // Render
    render() {
        const elem = this.props.elem; return(
            <div className="category" data-image-src={ elem.category_imgurl } data-type="category" data-id={ elem.category_id } 
                   onClick={ this.handleClick.bind(this) } >
                <div className="category-content-container" >
                    <div className="category-title" >{ elem.category_name }</div>
                    <div className="category-count" >{ elem.location_count }</div>
                </div>
            </div>
        );
    }

} module.exports = LocationCategory;
