
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        ready: false,
        poly_view: false,
        left_container: $('.left-container'),
        right_container: $('.right-container'),
    },
    
    // Init
    init: function() {
        // Load event single view
        var event_sv, lastScroll = 0, isNew = false;
        $(document).on( 'click', '.event', function() {
            $('.right-container').html('<div class="load-container"><img src="'+template_uri+'/style/assets/icons/loading.gif" class="loader" /></div>');
            ViewHandler.sync_scroll( $('.load-container'), lastScroll, true );
            EventSingleModule.render_sv_event( $(this).attr('id'), function() {
                EventSingleModule.bindUIActions();
                event_sv = $('.event-singleview-container .sync-container');
                isNew = true;
                $('.left-container').css({'height': 'auto'});
                $('.right-container').css({'height': 'auto'});
                if ( $('.left-container').innerHeight() < $('.sync-container').innerHeight() ) {
                    $('.left-container').css({'height': $('.sync-container').innerHeight()+'px'});
                } else { $('.right-container').css({'height': $('.left-container').innerHeight()+'px'}); }
                $(window).trigger('scroll');
            });
        });

        // Sync scroll
        $(window).on( 'scroll', function() {
            lastScroll = this.sync_scroll( event_sv, lastScroll, isNew );
            isNew = false;
        }.bind(this));
        
        this.settings.ready = true;
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    
    // Poly view init
    poly_view_init: function() {
        $('.content-container').flickity({
            cellAlign: 'left',
            contain: true,
            draggable: false,
            prevNextButtons: false,
            pageDots: false,
            adaptiveHeight: true,
        });    
        this.settings.poly_view = true;
    },
    
    // Go to
    go_to: function( index ) {
        $('.content-container').flickity( 'select', index );
    },
    
    // Sync Scroll
    sync_scroll: function( event_sv, lastScroll, isNew ) {
        if ( typeof event_sv !== 'undefined' ) {
            var st = $(window).scrollTop(),
                delta = st - lastScroll,
                newTop;
            
            // If new elem
            if ( isNew ) {
                newTop = $(window).scrollTop() - event_sv.parent().offset().top + $('#headerbar').innerHeight();
            }
                
            // Down
            if ( st + $(window).innerHeight() > event_sv.offset().top + event_sv.innerHeight() && delta > 0) {
                newTop = st + ( $(window).innerHeight() - event_sv.innerHeight() ) - event_sv.parent().offset().top }
            
            // Up
            if ( event_sv.innerHeight() < $(window).innerHeight() - $('#headerbar').innerHeight() ||
                 (st < event_sv.offset().top - $('#headerbar').innerHeight() && delta < 0 )) {
                newTop = st - event_sv.parent().offset().top + $('#headerbar').innerHeight(); }
            
            // Top
            if ( newTop < 0 ) { newTop = 0; }
            if ( newTop > event_sv.parent().innerHeight() - event_sv.innerHeight() ) {
                newTop = event_sv.parent().innerHeight() - event_sv.innerHeight();
            }
            
            event_sv.css({'top':newTop+'px'});
            return st;
        }
        
        // Failure
        return 0;
    },
    
};





