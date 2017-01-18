
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        ready: false,
        poly_view: false,
        content_container: $('.content-container'),
        left_container: $('.left-container .content'),
        right_container: $('.right-container .content'),
    },
    
    // Init
    init: function() {

        // Load event single view
        var event_sv, lastScroll = 0, isNew = false;
        $(document).on( 'click', '.event', function() {

            ViewHandler.settings.right_container.addClass('spoopy');

            EventSingleModule.render_sv_event( $(this).attr('id') );
            EventSingleModule.bindUIActions();
        
            setTimeout(function(){
                syncScroll.rescaleContainer();
                syncScroll.setHorizontalPosition();
                ViewHandler.settings.right_container.removeClass('spoopy');
            },120);

            ViewHandler.toggle_poly_view( true );

        });

        this.settings.ready = true;
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    
    // Toggle poly view
    toggle_poly_view: function( activeOnly ) {
        if ( activeOnly ) {
            this.settings.content_container.addClass('poly-view');
            return;
        }

        if ( this.settings.content_container.hasClass( 'poly-view' ) ) {
            this.settings.content_container.removeClass( 'poly-view' );
        } else {
            this.settings.content_container.addClass( 'poly-view' );
        }
    },

    // Go to
    go_to: function( index ) {
    },

    // Reload view
    reload_view: function( timeout ) {
<<<<<<< HEAD

        // Reload view heights
        if(ViewHandler.settings.poly_view){
            var to = 0;
            if ( timeout ) to = 150;
            setTimeout(function(){
                $('.left-container').css('height', 'auto');
                $('.sync-container').css('height', 'auto');
                $('.right-container').css('height', $('.sync-container').innerHeight());
                $('.content-container').flickity('reloadCells');
                $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                $(window).trigger('scroll');
            },to);
        }

=======
>>>>>>> origin/no-sync-scroll
    },

    // Close single view
    closeSingleView: function() {
<<<<<<< HEAD
        $('.left-container').addClass('no-trans');
        $('.right-container').addClass('no-trans');
        $('.right-container').html('').css({'height': '0px'}).removeClass('active');
        $('.left-container').removeClass('active');

        setTimeout(function() {
            $('.left-container').removeClass('no-trans');
            $('.right-container').removeClass('no-trans');
            this.reload_view( true );
=======
        ViewHandler.settings.left_container.addClass('no-trans').removeClass('active');
        ViewHandler.settings.right_container.addClass('no-trans').css({'height': '0px'}).html('').removeClass('active');

        setTimeout(function() {
            ViewHandler.settings.left_container.removeClass('no-trans');
            ViewHandler.settings.right_container.removeClass('no-trans');
            this.reload_view( false );
>>>>>>> origin/no-sync-scroll
        }.bind(this), 150);

        ViewHandler.go_to( 0 );
    },

};





