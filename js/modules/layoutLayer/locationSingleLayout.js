
var LocationSingleViewModule = {
<<<<<<< HEAD

    // Settings
    settings: {},

=======

    // Settings
    settings: {},

>>>>>>> origin/internalscroll
    // Init
    init: function() {
        let ViewHandler = require( './../view_handler.js' );

        // Closes single view
        $(document).on('click', '.location-singleview-bar .close-button', function () {
            var list = $('.location-list');

            if(list.length){
                history.pushState({type : 'category', id : list.attr('id')}, 'Towwwwn', main_path + '/kategori/' + list.attr('data-slug'));
            }

            ViewHandler.change_view_focus( 3, false, true );
        });
    },
<<<<<<< HEAD

=======

>>>>>>> origin/internalscroll
    // Render location single view
    renderSingleView: function( obj ) {
        let ViewHandler = require( './../view_handler.js' );
        let EventCalenderModule = require( './eventCalenderLayout.js' );
        let HelpFunctions = require( './../tools/help_functions.js' );
<<<<<<< HEAD

        $.get( rest_api+'events?parent='+obj.id, {}, function( data ) {

=======

        $.get( rest_api+'events?parent='+obj.id, {}, function( data ) {

>>>>>>> origin/internalscroll
            // Generates html
            var html = '<div class="location-singleview-bar">'+ obj.name +'<div class="close-button">&times;</div></div>';
            html += '<div class="location-singleview-content">';

            // Cover photo & picture
            html += '<div class="photo-container">';
            html += '<div class="coverphoto cta-icon" style="background-image:url('+obj.coverphoto+')"></div>';
            html += '<div class="picture" style="background-image:url('+obj.picture+')"></div>';
            html += '</div>';

            html += '<div class="cta-icons">';

            if ( typeof obj.phone !== 'undefined' ) {
                html += '<div class="cta-phone cta-icon" data-link="tel://'+obj.phone+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-phone"></use></svg></div></div>';
            }

            if ( typeof obj.website !== 'undefined' ) {
                html += '<div class="cta-website cta-icon" data-link="'+obj.website+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-web"></use></svg></div></div>';
            }

            if ( typeof obj.fbid !== 'undefined' ) {
                html += '<div class="cta-fb cta-icon" data-link="http://fb.com/'+obj.fbid+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-facebook"></use></svg></div></div>';
            }

            html += '</div>';
            html += '<div class="breakline"></div>'

            html += '<div class="description-container">';
            html += '<div class="title">Om '+obj.name+':</div>';
            html += '<div class="description">'+HelpFunctions.nl2p(HelpFunctions.linkifier( obj.description ))+'</div>';
            html += '</div>';

            html += '<div class="breakline"></div>';

            // Event slider
            if ( data.length > 3 ) {
                html += '<div class="event-slider" >';
                html += '<div class="prevButton button"><svg viewBox="0 0 20 20"><use xlink:href="#chevron-left"></use></svg></div>';
                html += '<div class="nextButton button"><svg viewBox="0 0 20 20"><use xlink:href="#chevron-right"></use></svg></div>';
                html += '<div class="inner" style="width:'+(data.length/3*100)+'%;">';

                data.forEach(function( item, index ) {

                    html += '<div class="item" style="width:'+(100/data.length)+'%;">';
                    html += EventCalenderModule.generateEventHtml( item );
                    html += '</div>';

                    /*html += '<div class="item" style="width:'+(100/data.length)+'%;">';
                    html += '<div class="imgcontainer" style="background-image:url('+item.imgurl+')"></div>';
                    html += '<div class="textcontainer">';
                    html += '<p class="location-sv-title">'+item.title+'</p>';
                    html += '</div>';
                    html += '</div>';*/
                });

                html += '</div>';
                html += '</div>';
            }

            /* FOOTER START */
            html += '<div class="sv-info-placeholder">';
            html += '<div class="sv-info">';

            // Title
            html += '<div class="footer-block title"><div class="icon" style="background-image: url('+obj.picture+');"></div><div class="value">'+obj.name+'</div></div>';

            // Facebook
            html += '<div class="footer-block clickable" data-link="http://fb.com/'+obj.fbid+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-facebook"></use></svg></div><div class="value">'+obj.name+'</div></div>'

            // Website
            if ( obj.website !== null && typeof obj.website !== 'undefined' ) {
                html += '<div class="footer-block clickable" data-link="'+obj.website+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-web"></use></svg></div><div class="value"  >'+obj.website+'</div></div>';
            }

            // Phone
            if ( obj.phone !== null && typeof obj.phone !== 'undefined' ) {
                html += '<div class="footer-block clickable" data-link-type="redirect" data-link="tel://'+obj.phone+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-phone"></use></svg></div><div class="value">'+obj.phone+'</div></div>';
            }

            // Adress
            if ( obj.adress !== null && typeof obj.adress !== 'undefined' ) {
                html += '<div class="footer-block clickable" data-link="https://google.dk/maps/search/'+obj.adress+', svendborg"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-address"></use></svg></div><div class="value">'+obj.adress+'</div></div>'
            }

            html += '</div></div>';
            /* FOOTER END */

            // Imgs
            // html += '<div class="imgcontainer" style="background-image:url('+obj.picture+')"></div>';

            html += '</div>';

            // Renders the html
            ViewHandler.settings.location_singleview.html( html );
            $('.event-slider').smamo_slider({
                'prevButton' : '.prevButton',
                'nextButton' : '.nextButton',
            });
<<<<<<< HEAD

=======

>>>>>>> origin/internalscroll
            $('.location-singleview-content .sv-info-placeholder').css(
                'height', $('.location-singleview-content .sv-info').outerHeight());

        });
    },
<<<<<<< HEAD

=======

>>>>>>> origin/internalscroll
    // Generate location singleview html
    generateHtml: function() {
        // Do stuff
    },
<<<<<<< HEAD

=======

>>>>>>> origin/internalscroll
}; module.exports = LocationSingleViewModule;
