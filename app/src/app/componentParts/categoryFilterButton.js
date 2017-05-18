

// Category Filter button
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );
class Loader extends React.Component {

    // Ctor
    constructor() { super(); }


    handleClick( e ){
        if(Globals.navigationBlocker) return;

        // Set bookmark
        _('.filter-button.bookmark-mode').removeClass('bookmark-mode');
        e.target.classList.add('bookmark-mode');

        // Set category globals
        Globals.locationDataHandler.getCategorySpecificLocation( this.props.category.category_id ).then(( resp ) => {
            Globals.setMainState({
                'currentLocationsCategory' : this.props.category,
                'currentLocations' : resp,
            });
        });
    }

    // Render
    render() {

        return (
            <div category={this.props.category} onClick={this.handleClick.bind(this)} className="rail-bar-menu-button filter-button">
                {this.props.name != null && this.props.name}
                { ( this.props.icon != null && this.props.viewBox !=null ) &&
                    <svg viewBox={this.props.viewBox}><use xlinkHref={this.props.icon}></use></svg>
                }
            </div>
        );
    }
} module.exports = Loader;
