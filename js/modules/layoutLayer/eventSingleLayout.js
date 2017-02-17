var EventSingleModule = {
    
    // Fields
    settings: {
        callback: function() {},
        elem: null,
        elem_back: '',
    },
    
    // Init
    init: function() {
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    
    // Render Single View Event
    render_sv_event: function( eventid, cb, elem ) {
        this.settings.elem = elem;
        $('.imgcontainer', elem).addClass('loadingsv');
        this.settings.callback = cb;
        
        var event;
        $.get(rest_api + 'events/' + eventid, function(data){
            if(typeof data[0] !== 'undefined'){
                event = data[0];


                // Generates html
                ViewHandler.settings.event_singleview.html( EventSingleModule.generate_sv_event_html( event ) );
                ViewHandler.settings.event_singleview.addClass( 'active' );
                ViewHandler.settings.event_calender.addClass( 'active' );
                ViewHandler.settings.event_singleview.parents('.sync-outer').scrollTop(0);
                ViewHandler.settings.event_singleview_outer.removeClass('spoopy');
                $('.imgcontainer', EventSingleModule.settings.elem).removeClass('loadingsv');

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
                
                EventSingleModule.settings.callback();
            }
        }.bind(this));


    },
    
    // Generate single view event html
    generate_sv_event_html: function( event ) {
        var desc_raw = event.description;
            if(desc_raw === null){desc_raw = '  ';}

        var desc = HelpFunctions.nl2p(HelpFunctions.linkifier( desc_raw ));


        var start_time = HelpFunctions.formatDate( event.start_time, true, true );
        

        var response = '<div class="event-bar">'+event.parentname+'<div class="close-button">&times;</div></div>';
        response += '<div class="event-sv-content-container">';
        response += '<div class="event-singleview">';

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
