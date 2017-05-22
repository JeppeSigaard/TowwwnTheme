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
        _('.event-filter-button').removeClass('bookmark-mode');
        e.target.classList.add('bookmark-mode');

        // Set event globals from props
        if(this.props.events != null){
            Globals.setMainState({ 'currentEvents' : this.props.events });
        }

        // Set event globals from state
        else if(this.state.events != null){
            Globals.setMainState({ 'currentEvents' : this.state.events });
        }

        // Set event globals from call
        else{}

    }

    componentDidMount(){

    }

    // Render
    render() {

        let className = 'rail-bar-menu-button filter-button event-filter-button';
        if(this.props.active != null && this.props.active) className += ' bookmark-mode';
        if(this.props.icon != null && this.props.name != null) className += ' icon-term';

        return (
            <div onClick={this.handleClick.bind(this)} className={className}>
                {this.props.name != null && <span className="button-term">{this.props.name}</span>}
                {this.props.count != null && <i className="button-count">{this.props.count}</i> }
                { ( this.props.icon != null && this.props.viewBox !=null ) &&
                    <svg viewBox={this.props.viewBox}><use xlinkHref={this.props.icon}></use></svg>
                }
            </div>
        );
    }
} module.exports = Loader;
