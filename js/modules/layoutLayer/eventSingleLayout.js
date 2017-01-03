var EventSingleModule = {
    
    // Fields
    settings: {
    },
    
    // Init
    init: function() {
        this.bindUIActions();
    },
    
    // Bind UI Actions
    bindUIActions: function() {  
        
        // Attending event
        $('.attending-btn').click(function() {
            if ( !FacebookModule.settings.loggedin ) {
                FacebookModule.login(function( response ) {
                    if ( response === true ) {
                        attend( this );
                    } else {
                        console.log( 'Login error' );
                    }
                });
            } else {
                attend( this );
            }
            
            function attend( t ) {
                $('.interested-btn .text').html('Interesseret');
                $('.interested-btn').removeClass('attending')
                
                var event;
                for ( var i = 0; i < EventContentModule.settings.events.length; i++ ) {
                    if ( EventContentModule.settings.events[i].fbid[0] === $(t).parent().attr('id') ) {
                        event = EventContentModule.settings.events[i]; break;
                    }
                }

                if ( event !== null && typeof event !== 'undefined' ) {
                    if ($(t).hasClass('attending')) {
                        FacebookModule.eventAction( $(t).parent().attr('id'), 'declined' );
                        $('.text', t).html('Deltager');
                        $('.icon', t).html('&plus;');
                        $(t).removeClass('attending')
                    } else {
                        FacebookModule.eventAction( $(t).parent().attr('id'), 'attending' );
                        $('.text', t).html('Deltager ikke');
                        $('.icon', t).html('&times;');
                        $(t).addClass('attending')
                    }
                }
            }
        });
        
        // Interested in event
        $('.interested-btn').on('click', function() {
            if ( !FacebookModule.settings.loggedin ) {
                FacebookModule.login(function( response ) {
                    if ( response === true ) {
                        interested( this );
                    } else {
                        console.log( 'Login error' );
                    }
                });
            } else {
                interested( this );
            }
            
            function interested( t ) {
                $('.attending-btn .text').html('Deltager');
                $('.attending-btn .icon').html('&plus;');
                $('.attending-btn').removeClass('attending')
                
                var event;
                for ( var i = 0; i < EventContentModule.settings.events.length; i++ ) {
                    if ( EventContentModule.settings.events[i].fbid[0] === $(t).parent().attr('id') ) {
                        event = EventContentModule.settings.events[i]; break;
                    }
                }

                if ( event !== null && typeof event !== 'undefined' ) {
                    if ($(t).hasClass('attending')) {
                        FacebookModule.eventAction( $(t).parent().attr('id'), 'declined' );
                        $('.text', t).html('Interesseret');
                        $(t).removeClass('attending')
                    } else {
                        FacebookModule.eventAction( $(t).parent().attr('id'), 'maybe' );
                        $('.text', t).html('Ikke interesseret');
                        $(t).addClass('attending')
                    }
                }
            }
        });
    
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
        
        // Checks if user is already attending
        UserModule.attendingEvent( event, function(response, event) {
            
            // Generates html
            ViewHandler.settings.right_container.html( this.generate_sv_event_html( event, response ) );
            ViewHandler.settings.right_container.addClass( 'active' );
            ViewHandler.settings.left_container.addClass( 'active' );

            // Defines height of blue box height
            $('.event-sv-info-placeholder').css({height: $('.event-sv-info').outerHeight() + 'px'});
            
            // Calllll back
            cb();
            
        }.bind(this));
        
    },
    
    // Generate single view event html
    generate_sv_event_html: function( event, attending ) {
        
        var desc = HelpFunctions.nl2p(HelpFunctions.linkifier( event.description[0] ));
        var start_time = HelpFunctions.formatDate( event.start_time[0], true );
        
        var response = '<div class="event-singleview-container" >';
        response += '<div class="sync-container">';
        response += '<div class="event-sv-content-container">';
        response += '<div class="event-singleview">';
        response += '<div class="event-sv-parentname">'+event.parentname[0]+'</div>';
        response += '<div class="event-sv-img" style="background-image:url('+event.imgurl[0]+');"></div>';
        response += '<div class="event-sv-title">'+event.name[0]+'</div>';
        response += '<div class="event-sv-start-time">'+start_time+'</div>';
        response += '<hr class="lineBreak" />';
        
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
        
        response += '</div>';
        
        response += '<hr class="lineBreak" />';
        response += '<div class="event-sv-desc">'+desc+'</div>';
        response += '</div>';
        
        response += '<div class="event-sv-info-placeholder"></div>';
        response += '<div class="event-sv-info">';
        response += '<div class="event-sv-parentname">'+event.parentname[0]+'</div>';
        
        if ( event.adress[0] !== null && typeof event.adress[0] !== 'undefined' ) {
            response += '<div class="event-sv-adress">'+event.adress[0]+'</div>';
        }
            
        if ( event.website[0] !== null && typeof event.website[0] !== 'undefined' ) {
            response += '<a class="event-sv-website" href="'+event.website[0]+'">'+event.website[0]+'</a>';
        }
        
        response += '</div></div>';
        if ( commercial_image_url !== '' ) {
            response += '<div class="commercial-placeholder"></div>';
            response += '<a href="'+commercial_link+'"><div class="commercial-img" style="background-image:url('+commercial_image_url+');"></div></a>';
        }
        
        return response+='</div></div>';
        
    },
    
};