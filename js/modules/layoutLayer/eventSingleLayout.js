var EventSingleModule = {
    
    // Fields
    settings: {
    },
    
    // Init
    init: function() {
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    
    // Render Single View Event
    render_sv_event: function( eventid, cb ) {

        
        // Finds event in eventmodule event array
        var event;
        for ( var i = 0; i < EventContentModule.settings.events.length; i++ ) {
            if ( EventContentModule.settings.events[i].id.toString() === eventid ) {
                event = EventContentModule.settings.events[i]; break;
            }
        }

        // Generates html
        ViewHandler.settings.right_container.html( this.generate_sv_event_html( event ) );
        ViewHandler.settings.right_container.addClass( 'active' );
        ViewHandler.settings.left_container.addClass( 'active' );
        ViewHandler.settings.right_container.parents('.sync-outer').scrollTop(0);

        var lastDark = true;
        $('.event-footer-block').each(function(iter, elem) {
            if ( lastDark ) { lastDark = false; }
            else {
                $(this).addClass('dark');
                lastDark = true;
            }
        });

        // Defines height of blue box height
        $('.event-sv-info-placeholder').css({height: $('.event-sv-info').outerHeight() + 'px'});
        
        // Trigger resize
        setTimeout(function() {
            $(window).trigger('resize');
        }, 200);

    },
    
    // Generate single view event html
    generate_sv_event_html: function( event ) {
        
        var desc = HelpFunctions.nl2p(HelpFunctions.linkifier( event.description ));
        var start_time = HelpFunctions.formatDate( event.start_time, true, true );
        

        var response = '<div class="event-sv-content-container">';
        response += '<div class="event-singleview">';
        response += '<div class="event-sv-parentname">'+event.parentname+'</div>';

        if ( event.imgurl !== '' && event.imgurl !== null && typeof event.imgurl !== 'undefined' ) {
            response += '<div class="event-sv-img" style="background-image:url('+event.imgurl+');"></div>';
        } else {
            response += '<div class="event-sv-img" style="background-image:url(http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png);"></div>';
        }

        response += '<div class="event-sv-title">'+event.name+'</div>';
        response += '<div class="event-sv-start-time">'+start_time+'</div>';
        response += '<hr class="lineBreak" />';
        response += '<div class="es-btns">';

        response += '<div class="status-btn share" data-link="https://www.facebook.com/events/'+event.fbid+'"><div class="icon"><svg viewbox="0 0 32 32" ><use xlink:href="#icon-facebook"></use></svg></div>';
            response += '<div class="text">Del</div></div>';
        
        if ( event.ticket_uri !== '' && event.ticket_uri !== null ) {
            response += '<div class="status-btn ticket" data-link="'+event.ticket_uri+'">';
            response += '<div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-ticket"></use></svg></div>';
            response += '<div class="text">Køb billet</div></div>';
        }
        
        response += '</div><hr class="lineBreak" />';
        
        /* Status buttons
        response += '<div class="event-sv-status-btns" id="'+event.fbid[0]+'">';
        
        if ( attending !== 'unsure' ) {
            response += '<div class="interested-btn status-btn"><div class="icon">&#x2605;</div> <div class="text">Interesseret</div></div>';
        } else {
            response += '<div class="interested-btn status-btn attending"><div class="icon">&#x2605;</div> <div class="text">Ikke interesseret</div></div>';
        }
        
        if ( attending !== 'attending' ) {
            response += '<div class="attending-btn status-btn"><div class="icon">&plus;</div> <div class="text">Deltager</div></div>';
        } else {
            response += '<div class="attending-btn status-btn attending"><div class="icon">&times;</div> <div class="text">Deltager ikke</div></div>';
        }
        
        response += '</div>';*/

        response += '<div class="event-sv-desc">'+desc+'</div>';
        response += '</div>';
        

        /* FOOTER START */
        response += '<div class="event-sv-info-placeholder"></div>';
        response += '<div class="event-sv-info">';
        
        // Title
        response += '<div class="event-footer-block title"><div class="icon" style="background-image: url('+event.parentpicture+');"></div><div class="value">'+event.parentname+'</div></div>';
        
        // Facebook
        response += '<div class="event-footer-block clickable" data-link="http://fb.com/'+event.parentid+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-facebook"></use></svg></div><div class="value">'+event.parentname+'</div></div>'

        // Website
        if ( event.website !== null && typeof event.website !== 'undefined' ) {
            response += '<div class="event-footer-block clickable" data-link="'+event.website+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-web"></use></svg></div><div class="value"  >'+event.website+'</div></div>';
        } 
        
        // Phone
        if ( event.phone !== null && typeof event.phone !== 'undefined' ) {
            response += '<div class="event-footer-block clickable" data-link-type="redirect" data-link="tel://'+event.phone+'"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-phone"></use></svg></div><div class="value">'+event.phone+'</div></div>';
        }

        // Adress
        if ( event.adress !== null && typeof event.adress !== 'undefined' ) {
            response += '<div class="event-footer-block clickable" data-link="https://google.dk/maps/search/'+event.adress+', svendborg"><div class="icon"><svg viewbox="0 0 32 32"><use xlink:href="#icon-address"></use></svg></div><div class="value">'+event.adress+'</div></div>'
        }

        response += '</div></div>';
        /* FOOTER END */


        if ( commercial_image_url !== '' ) {
            response += '<div class="commercial-placeholder"></div>';
            response += '<a href="'+commercial_link+'"><div class="commercial-img" style="background-image:url('+commercial_image_url+');"></div></a>';
        }
        

        return response;
        
    },
    
};
