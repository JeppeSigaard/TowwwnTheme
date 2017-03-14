


// View top bar
const React = require( 'react' ),
      Globals = require( '../globals.js' );

class ViewTopBar extends React.Component {
    
    // Ctor
    constructor() { 
        super();
    }
    
    // Close View
    closeView() {
        Globals.viewHandler.changeViewFocus(
            this.props.closeviewstate.leftview,
            this.props.closeviewstate.rightview,
            this.props.closeviewstate.fromLeft, 
            this.props.closeviewstate.fromRight, 
            false
        );
    }
    
    // Render
    render() {
        return ( 
            <div className={ this.props.darken === true ? "viewbar dark" : "viewbar" }>
                { this.props.standard &&
                    <a href={ this.props.href } data-type={ this.props.datatype } data-id={ this.props.id } >
                        { this.props.title }
                    </a>
                }
                
                { this.props.other }
                { this.props.standard &&
                    <div className="close-button" onClick={ this.closeView.bind(this) } >&times;</div>
                }
            </div>
        );
    }
    
} module.exports = ViewTopBar;