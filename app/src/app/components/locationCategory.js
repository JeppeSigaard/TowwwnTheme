

// Location Category
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      BehaviourDataHandler = require( '../../modules/handlers/behaviourHandler/dataHandler.js' );

class LocationCategory extends React.Component {

    // Ctor
    constructor() { 
        super();               
    }

    // Handle Click
    handleClick( e ) {
        
        if ( _( '.category.bookmark-mode' ) !== false ) _( '.category.bookmark-mode' ).removeClass('bookmark-mode');
        _( '#category-'+this.props.elem.category_id ).addClass('bookmark-mode');
        
        this.props.clickEvent.call( this, e );
    }

    // Render
    render() {
        const elem = this.props.elem; return(
            <div className="category" id={ 'category-' + elem.category_id } data-image-src={ elem.category_imgurl } data-type="category" data-id={ elem.category_id } 
                   onClick={ this.handleClick.bind(this) } >
                <div className="category-content-container" >
                    <div className="category-title" >{ elem.category_name }</div>
                    <div className="category-count" >{ elem.location_count }</div>
                </div>
            </div>
        );
    }

} module.exports = LocationCategory;
