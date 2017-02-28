
// Single Event Layout
class Event extends React.component {

    // Render function
    render( ) {

        // Fields
        let helpFunctions = require( './../../tools/help_functions.js' ),
            elem = this.props.elem,
            semanticTime = helpFunctions.formatDate( elem.start_time, false, true, true, false, true ),
            title = String(elem.name).substr(0, 36) + ( String(elem.name).substr(36,99).split( ' ' )[0] ),
            image = '';

        // Title length formatting
        if ( title.length !== String( elem.name ).length ) title+=' ...';
        let words = title.split( ' ' );
        words.forEach( function( item, index ) {
            if ( item.length > 14 ) {
                words[index ] = words[ index ].substr(0,14) +
                    '-<br />' + words[ index ].substr(12,9999); }
        }); title = words.join(' ');

        // Image
        if ( typeof elem.images !== 'undefined' && elem.images[130] !== null && typeof elem.images[130] !== 'undefined' ) {
            image = elem.images[130];
        } else if ( elem.imgurl !== '' && elem.imgurl !== null && typeof elem.imgurl !== 'undefined' ) {
            image = elem.imgurl;
        } else {
            image = 'http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png';
        }

        // Html
        return (
            <div className="event" id={ 'event-' elem.id } data-type="event" data-id={ elem.id } >
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
                    <div className="eventlocation">{ elem.parentName }</div>
                </div>
            </div>
        );

    }

} module.exports = Event;
