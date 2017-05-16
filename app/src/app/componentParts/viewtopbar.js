


// View top bar
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' );

class ViewTopBar extends React.Component {
    
    // Ctor
    constructor() { 
        super();
        this.state = { };
    }
    
    // Close View
    closeView() {
        if ( _('body').hasClass('mobile') &&
             this.props.closeviewstate.mobile != null ) {
            Globals.viewHandler.changeMobileViewFocus(
                this.props.closeviewstate.mobile.view,
                this.props.closeviewstate.mobile.fromLeft,
                this.props.closeviewstate.mobile.fromRight,
            );
        } else {
            Globals.viewHandler.changeViewFocus(
                this.props.closeviewstate.leftview,
                this.props.closeviewstate.rightview,
                this.props.closeviewstate.fromLeft, 
                this.props.closeviewstate.fromRight, 
                false,
                this.props.closeviewstate.ignoreAutoDirection,
                this.props.closeviewstate.leftSize,
                this.props.closeviewstate.rightSize
            );
        } if ( this.props.onClose != null ) this.props.onClose();
    }

    // Change view
    changeView() {
        if ( this.props.willChangeView != null ) this.props.willChangeView();
        Globals.setMainState({ from : this.props.name });

        if ( _('body').hasClass('mobile') ) {
            Globals.viewHandler.changeMobileViewFocus(
                this.props.vref.mobile.view,
                this.props.vref.mobile.fromLeft,
                this.props.vref.mobile.fromRight
            );
        } else {
            Globals.viewHandler.changeViewFocus(
                this.props.vref.leftview,
                this.props.vref.rightview,
                this.props.vref.fromLeft,
                this.props.vref.fromRight,
                false
            );
        }
    }

    // Heart
    heart() {
        if ( this.props.heartFunc != null ) this.props.heartFunc();
        else console.log( 'No heart func set' );
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
                { this.props.heart &&
                    <div className="heart" onClick={ this.heart.bind(this) } >
                        <svg viewBox="0 0 32 32">
                            <use xlinkHref="#icon-heart" >
                            </use>
                        </svg>
                    </div>
                }

                { this.props.standard &&
                    <div className="close-button" onClick={ this.closeView.bind(this) } >&times;</div>
                }
            </div>
        );
    }

} module.exports = ViewTopBar;
