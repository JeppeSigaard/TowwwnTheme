

// Location
const React = require( 'react' ),
      Globals = require( '../globals.js' );

class Location extends React.Component {
    
    // Ctor
    constructor() { super(); }
    
    // Handle Click
    handleClick( e ) {
        e.preventDefault();
        this.props.setMainState({
            'singleLocation' : this.props.elem,
        });
        
        Globals.setMainState({ from : this.props.name });
        Globals.viewHandler.changeViewFocus(
            'location-list-view',
            'location-single-view',
            false, true, false
        );
    }
    
    // Render
    render() {
        let elem = this.props.elem;
        if ( elem != null ) {
            return (
                <a className="location-container" onClick={ this.handleClick.bind(this) } >
                    <span className="location-picture" style={{ 'backgroundImage' : elem.picture }} ></span>
                    <span className="location-description">
                        <h2 className="location-title">{ elem.name }</h2>
                        <p className="location-about">{ elem.about }</p>
                    </span>
                </a>
            );
        } else return <a className="location-container"></a>
    }
    
} module.exports = Location;