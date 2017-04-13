

// Location Category
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' );

class LocationCategory extends React.Component {

    // Ctor
    constructor() { 
        super();               
    }

    // Handle Click
    handleClick( e ) {
        this.props.clickEvent.call( this, e );
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
