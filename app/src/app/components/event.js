
// Single Event Layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      SingleEvent = require( './singleEvent.js' );

class Event extends React.Component {
    
    // Click Handler
    handleClick( e ) {
        e.preventDefault();
        this.props.setMainState( 
            'singleevent', 
            <SingleEvent elem={ this.props.elem } />
        );
        
        Globals.viewHandler.changeViewFocus(  
            'event-single-view',
            'event-calendar-view',
            true, false, false
        ); 
    }

    // Format title
    formatTitle( elem ) {

        // Splits the title at space nearest char 36
        let title = String(elem.name).substr(0, 36) + ( String(elem.name).substr(36,99).split( ' ' )[0] );

        // Title length formatting
        if ( title.length !== String( elem.name ).length ) title+=' ...';
        let words = title.split( ' ' );
        words.forEach( function( item, index ) {
            if ( item.length > 14 ) {
                words[index ] = words[ index ].substr(0,14) +
                    '-<br />' + words[ index ].substr(12,9999); }
        }); title = words.join(' ');

        // Returns
        return title;

    }

    // Extract image url
    extractImageUrl( elem ) {
        let response;

        // Prioritizes 130px wide images first
        if ( typeof elem.images !== 'undefined' && elem.images[130] !== null && typeof elem.images[130] !== 'undefined' ) {
            response = elem.images[130]; }

        // Then large image
        else if ( elem.imgurl !== '' && elem.imgurl !== null && typeof elem.imgurl !== 'undefined' ) {
            response = elem.imgurl; }

        // If none found, use placeholder
        else { response = 'http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png'; }

        return response;

    }

    // Render function
    render( ) {

        // Fields
        let helpFunctions = require( '../../../../js/modules/tools/help_functions.js' ),
            elem = this.props.elem,
            semanticTime = helpFunctions.formatDate( elem.start_time, false, true, true, false, true ),

            title = this.formatTitle( this.props.elem ),
            image = this.extractImageUrl( this.props.elem );

        // Html
        return (
            <a className="event" onClick={ this.handleClick.bind(this) } >
                <div className="imgcontainer" data-image-src={ image } >
                    <div className="loader">
                        <img src={ template_uri + '/style/assets/icons/loading-white.svg' } />
                    </div>
                </div>

                <div className="eventtext">
                    <div className="ripple"></div>
                    <div className="title">{ title }</div>
                    <div className="start_time">{ semanticTime }</div>
                </div>

                <div className="eventlocation-container">
                    <div className="eventblackbar"></div>
                    <div className="eventlocation">{ elem.parentname }</div>
                </div>
            </a>
        );

    }

} module.exports = Event;
