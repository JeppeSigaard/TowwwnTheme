var EventSingleModule = {
    
    // Fields
    settings: {
    },
    
    // Init
    init: function() {
        var lastTime = 0;
        $(document).on('mouseup', '.share', function() {
            if ( new Date().getTime() - lastTime > 1000 ) {
                window.open( 'https://www.facebook.com/sharer/sharer.php?u=https%3A//www.facebook.com/events/'+$(this).parent().attr('id') );
                lastTime = new Date().getTime();
            }
        });
        
        var fbLastTime = 0;
        $(document).on('mouseup', '.fb', function() {
            if ( new Date().getTime() - fbLastTime > 1000 ) {
                window.open( 'https://fb.com/'+$(this).attr('id') );
                fbLastTime = new Date().getTime();
            }
        });
        
        var ticketLastTime = 0;
        $(document).on('mouseup', '.ticket', function() {
           if ( new Date().getTime() - ticketLastTime > 1000 ) {
                window.open( $(this).attr('data-ticket') );
                ticketLastTime = new Date().getTime();
           } 
        });
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
        
        console.log( event );
        
        // Generates html
        ViewHandler.settings.right_container.html( this.generate_sv_event_html( event ) );
        ViewHandler.settings.right_container.addClass( 'active' );
        ViewHandler.settings.left_container.addClass( 'active' );

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
        response += '<div class="event-sv-img" style="background-image:url('+event.imgurl+');"></div>';
        response += '<div class="event-sv-title">'+event.name+'</div>';
        response += '<div class="event-sv-start-time">'+start_time+'</div>';
        response += '<hr class="lineBreak" />';
        response += '<div class="es-btns" id="'+event.fbid+'">';
        response += '<div class="status-btn share"><img src="'+template_uri+'/style/assets/icons/share.svg" class="icon share" />';
            response += '<div class="text">Del</div></div>';
        
        if ( event.ticket_uri !== '' && event.ticket_uri !== null ) {
            response += '<div class="status-btn ticket" data-ticket="'+event.ticket_uri+'">';
            response += '<img src="'+template_uri+'/style/assets/icons/ticket.svg" class="icon ticket" />';
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
        
        response += '<div class="event-sv-info-placeholder"></div>';
        response += '<div class="event-sv-info">';
        response += '<div class="event-sv-parentname">'+event.parentname+'</div>';
        
        var adress = '';
        if ( event.adress !== null && typeof event.adress !== 'undefined' ) {
            adress = event.adress;
        } response += '<div class="event-sv-adress">'+adress+'</div>';
        
        if ( event.website !== null && typeof event.website !== 'undefined' ) {
            response += '<a class="event-sv-website" href="'+event.website+'">'+event.website+'</a>';
        } 
        
        response += '<div class="fb" id="'+event.fbid+'"><img class="fbIcon" src="'+template_uri+'/style/assets/icons/facebook.svg" /></div>';
        response += '</div></div>';
        if ( commercial_image_url !== '' ) {
            response += '<div class="commercial-placeholder"></div>';
            response += '<a href="'+commercial_link+'"><div class="commercial-img" style="background-image:url('+commercial_image_url+');"></div></a>';
        }
        

        return response;
        
    },
    
};
