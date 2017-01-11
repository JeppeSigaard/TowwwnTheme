
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
            ViewHandler.settings.right_container.addClass('spoopy');

            $('.right-container').html('<div class="load-container"><img src="'+template_uri+'/style/assets/icons/loading.gif" class="loader" /></div>');
            ViewHandler.sync_scroll( $('.load-container'), lastScroll, true );
            EventSingleModule.render_sv_event( $(this).attr('id') );
            EventSingleModule.bindUIActions();

            if(ViewHandler.settings.poly_view){
                setTimeout(function(){
                    ViewHandler.settings.right_container.removeClass('spoopy');
                    $('.left-container').css('height', 'auto');
                    $('.right-container').css('height', $('.sync-container').innerHeight());
                    $('.content-container').flickity('reloadCells');
                    $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                    $(window).trigger('scroll');
                    ViewHandler.go_to(1);
                },100);
            }

            event_sv = $('.event-singleview-container .sync-container');
            isNew = true;

        });

        // Sync scroll
        $(window).on( 'scroll', function() {
            lastScroll = this.sync_scroll( event_sv, lastScroll, isNew );
            isNew = false;
        }.bind(this));
        
        // Resize update
        $(window).on('resize', function() {

            // Reload view heights
            if(ViewHandler.settings.poly_view){
                setTimeout(function(){
                    $('.left-container').css('height', 'auto');
                    $('.right-container').css('height', $('.sync-container').innerHeight());
                    $('.content-container').flickity('reloadCells');
                    $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                    $(window).trigger('scroll');
                },150);
            }

        });

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
            adaptiveHeight: false,
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
            if ( st + $(window).innerHeight() > event_sv.offset().top + event_sv.innerHeight() && delta >= 0) {
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
    
    // Reload view
    reload_view: function( timeout ) {

        // Reload view heights
        if(ViewHandler.settings.poly_view){
            var to = 0;
            if ( timeout ) to = 150;
            setTimeout(function(){
                $('.left-container').css('height', 'auto');
                $('.right-container').css('height', $('.sync-container').innerHeight());
                $('.content-container').flickity('reloadCells');
                $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                $(window).trigger('scroll');
            },to);
        }

    },

    // Close single view
    closeSingleView: function() {
        $('.left-container').addClass('no-trans');
        $('.right-container').addClass('no-trans');
        $('.right-container').css({'height': '0px'}).html('').removeClass('active');
        $('.left-container').removeClass('active');

        setTimeout(function() {
            $('.left-container').removeClass('no-trans');
            $('.right-container').removeClass('no-trans');
            this.reload_view( false );
        }.bind(this), 150);

        ViewHandler.go_to( 0 );
    }

};





