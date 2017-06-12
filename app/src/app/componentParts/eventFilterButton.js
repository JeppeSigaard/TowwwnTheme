// Category Filter button
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );
class EventFilterbutton extends React.Component {

    // Ctor
    constructor() {
        super();
    }

    handleClick( e ){

        if(Globals.navigationBlocker) return;

        // Set bookmark
        _('.event-filter-button').removeClass('bookmark-mode');
        e.target.classList.add('bookmark-mode');

        if(typeof this.props.onClick == 'function'){
            this.props.onClick();
        }
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
} module.exports = EventFilterbutton;
