
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        poly_view: false,
        left_container: $('.left-container'),
        right_container: $('.right-container'),
    },
    
    // Init
    init: function() {
        this.bindUIActions();
    },
    
    // Bind UI Actions
    bindUIActions: function() {
        
        // Load event single view
        var event_sv, lastScroll = 0;
        $('.event').on( 'click', function() {
            ViewHandler.render_sv_event( $(this).attr('id') );
            $('.event-sv-info-placeholder').css({height: $('.event-sv-info').outerHeight() + 'px'});
            event_sv = $('.event-singleview-container .sync-container');
            $(window).trigger('scroll');
        });
        
        // Sync scroll
        $(window).on( 'scroll', function() {
            lastScroll = this.sync_scroll( event_sv, lastScroll );
        }.bind(this));
        
        
    },
    
    // Poly view init
    poly_view_init: function() {
        $('.content-container').flickity({
            cellAlign: 'left',
            contain: true,
            //draggable: false,
            //prevNextButtons: false,
            //pageDots: false
        });    
        this.settings.poly_view = true;
    },
    
    // Go to
    go_to: function( index ) {
        $('.content-container').flickity( 'select', index );
    },
    
    // Sync Scroll
    sync_scroll: function( event_sv, lastScroll ) {
        if ( typeof event_sv !== 'undefined' ) {
            var st = $(window).scrollTop(),
                delta = st - lastScroll,
                newTop;
            
            var offset = 0;
            
            // Down
            if ( st + $(window).innerHeight() > event_sv.offset().top + event_sv.innerHeight() + offset && delta >= 0) {
                newTop = st + ( $(window).innerHeight() - event_sv.innerHeight() ) - event_sv.parent().offset().top - offset }
            
            // Up
            if ( event_sv.innerHeight() < $(window).innerHeight() - $('#headerbar').innerHeight() - offset * 2 ||
                 (st < event_sv.offset().top - offset - $('#headerbar').innerHeight() && delta < 0 )) {
                newTop = st - event_sv.parent().offset().top + $('#headerbar').innerHeight() + offset; }
            
            // Top
            if ( newTop < offset ) { newTop = offset; }
            event_sv.css({'top':newTop+'px'});
            return st;
        }
        
        // Failure
        return 0;
    },
    
    // Render single view event
    render_sv_event: function( eventid ) {
        
        // Finds event in eventmodule event array
        var event;
        for ( var i = 0; i < EventContentModule.settings.events.length; i++ ) {
            if ( EventContentModule.settings.events[i].id.toString() === eventid ) {
                event = EventContentModule.settings.events[i]; break;
            }
        }
        
        // Generates html
        this.settings.right_container.html( this.generate_sv_event_html( event ) );
        this.settings.right_container.addClass( 'active' );
        this.settings.left_container.addClass( 'active' );
        
    },
    
    // Generate single view event html
    generate_sv_event_html: function( event ) {
        console.log( event );
        
        var desc = HelpFunctions.nl2p(HelpFunctions.linkifier( event.description[0] ));
        var start_time = HelpFunctions.formatDate( event.start_time[0] );
        
        var response = '<div class="event-singleview-container" >';
        response += '<div class="sync-container">';
        response += '<div class="event-singleview">';
        response += '<div class="event-sv-parentname">'+event.parentname[0]+'</div>';
        response += '<div class="event-sv-img" style="background-image:url('+event.imgurl[0]+');"></div>';
        response += '<div class="event-sv-title">'+event.name[0]+'</div>';
        response += '<div class="event-sv-start-time">'+start_time+'</div>';
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
        
        return response+='</div></div></div>';
    }
    
};





