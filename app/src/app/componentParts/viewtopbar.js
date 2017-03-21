


// View top bar
const React = require( 'react' ),
      Globals = require( '../globals.js' );

class ViewTopBar extends React.Component {
    
    // Ctor
    constructor() { 
        super();
        this.state = { };
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

        Globals.syncScroll.rescaleContainer();
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

        Globals.syncScroll.rescaleContainer();
    }

    // Component Will Receive Props
    componentWillReceiveProps( nextProps ) {
        let classes = 'viewbar';
        if ( nextProps.darken ) classes += ' dark';
        if ( nextProps.clickable ) classes += ' clickable';
        this.setState({ classes : classes });
    }
    
    // Render
    render() {
        return ( 
            <div className={ this.state.classes != null ? this.state.classes : "viewbar" }>
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
