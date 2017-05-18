

// Category Filter button
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );
class Loader extends React.Component {

    // Ctor
    constructor() {
        super();
    }


    handleClick( e ){
        if(Globals.navigationBlocker) return;

        // Set bookmark
        _('.filter-button').removeClass('bookmark-mode');
        e.target.classList.add('bookmark-mode');

        // Set category globals
        Globals.locationDataHandler.getCategorySpecificLocation( this.props.elem.category_id ).then(( resp ) => {
            Globals.setMainState({
                'currentLocations' : resp,
            });
        });
    }

    // Render
    render() {

        let className = 'rail-bar-menu-button filter-button';
        if(this.props.active != null && this.props.active) className += ' bookmark-mode';

        return (
            <div onClick={this.handleClick.bind(this)} className={className}>
                {this.props.name != null && this.props.name}
                { ( this.props.icon != null && this.props.viewBox !=null ) &&
                    <svg viewBox={this.props.viewBox}><use xlinkHref={this.props.icon}></use></svg>
                }
            </div>
        );
    }
} module.exports = Loader;
