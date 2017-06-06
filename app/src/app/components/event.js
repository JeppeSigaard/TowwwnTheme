
// Single Event Layout
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      SingleEvent = require( './singleEvent.js' ),
      DataFormatters = require( '../../modules/tools/dataFormatters.js' );

class Event extends React.Component {

    // Click Handlers
    eventRefClick( e ) { e.preventDefault(); if(!Globals.navigationBlocker){

        Globals.setMainState({ from : this.props.name });
        Globals.setMainState(
            'singleevent',
            this.props.elem
        );

        // Push to browser history
        Globals.history.push(this.props.elem);

        if ( this.props.vref != null ) {
            if ( _('body').hasClass('mobile') ) {
                Globals.viewHandler.changeMobileViewFocus( // Tmp
                    this.props.vref.mobile.view,
                    this.props.vref.mobile.fromLeft,
                    this.props.vref.mobile.fromRight
                );
            } else {
                Globals.viewHandler.changeViewFocus(
                    this.props.vref.leftView,
                    this.props.vref.rightView,
                    this.props.vref.fromLeft,
                    this.props.vref.fromRight,
                    false,
                    this.props.vref.ignoreAutoDirection
                );
            }
        } else {
            if ( _('body').hasClass('mobile') ) {
                Globals.viewHandler.changeMobileViewFocus(
                    '#event-single-view',
                    true, false
                );
            } else {
                Globals.viewHandler.changeViewFocus(
                    '#event-calendar-view',
                    '#event-single-view',
                    true, false, false
                );
            }
        }
    }}

    locationRefClick( e ) {
        e.preventDefault();

        Globals.setMainState({
            singleLocation : null
        });

        if ( _('body').hasClass('mobile') ) {
            Globals.viewHandler.changeMobileViewFocus(
                '#location-single-view',
                true, false
            );
        } else {
            Globals.viewHandler.changeViewFocus(
                '#location-single-view',
                '#event-calendar-view',
                true, false, false
            );
        }

        let xhr = new XMLHttpRequest();
        xhr.onload = function ( data ) {

            // Resolves all locations
            let location = JSON.parse( data.target.response )[0];
            Globals.setMainState({
                'singleLocation' : location,
            });

            // Push to browser history
            Globals.history.push(this.props.elem);

            Globals.setMainState({ from : this.props.name });

        }.bind(this);

            // Sends request
            xhr.open( 'GET', app_data.rest_api + '/locations/' + this.props.elem.parentid );
            xhr.send();
    }

    // Format title
    formatTitle( elem ) {

        // Splits the title at space nearest char 48
        let title = String(elem.name).substr(0, 48) + ( String(elem.name).substr(48,99).split( ' ' )[0] );

        // Title length formatting
        if ( title.length !== String( elem.name ).length ) title+=' ...';
        let words = title.split( ' ' );
        words.forEach( function( item, index ) {
            if ( item.length > 16 ) {
                words[index ] = words[ index ].substr(0,16) +
                    '- ' + words[ index ].substr(16,9999); }
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
        else { response = app_data.template_uri + '/style/assets/images/placeholder-camera-green.png'; }

        return response;

    }

    // Render function
    render( ) {

        // Fields
        let elem = this.props.elem,
            semanticTime = DataFormatters.formatDate( elem.start_time, true, true, true, false, true ),

            title = this.formatTitle( this.props.elem ),
            image = this.extractImageUrl( this.props.elem );

        // Html
        return (
            <a className="event" href={ app_data.main_path + '/event/' + this.props.elem.slug } style={ this.props.style != null ? this.props.style : {} } onClick={ this.eventRefClick.bind(this) }  >
                <div className="imgcontainer" data-image-src={ image } ></div>
                <div className="eventtext" onClick={ this.eventRefClick.bind(this) } >
                    <div className="ripple"></div>
                    <div className="title">{ title }</div>
                    <div className="start_time">{ semanticTime }</div>
                </div>

                <div className="eventlocation-container" onClick={ this.locationRefClick.bind(this) } >
                    <div className="eventblackbar"></div>
                    <div className="eventlocation">{ elem.parentname }</div>
                </div>
            </a>
        );

    }

} module.exports = Event;
