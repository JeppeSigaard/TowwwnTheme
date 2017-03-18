


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
    
    // Change view
    changeView() {
        if ( this.props.willChangeView != null ) this.props.willChangeView();
        Globals.setMainState({ from : this.props.name });
        Globals.viewHandler.changeViewFocus(
            this.props.vref.leftview,
            this.props.vref.rightview,
            this.props.vref.fromLeft, 
            this.props.vref.fromRight, 
            false
        );
    }
    
    // Render
    render() {
        return ( 
            <div className={ this.props.darken === true ? "viewbar dark" : "viewbar" }>
                { this.props.standard &&
                    <a onClick={ this.props.vref != null ? this.changeView.bind(this) : function() {} }>{ this.props.title }</a>
                }
                
                { this.props.other }
                { this.props.standard &&
                    <div className="close-button" onClick={ this.closeView.bind(this) } >&times;</div>
                }
            </div>
        );
    }
    
} module.exports = ViewTopBar;
