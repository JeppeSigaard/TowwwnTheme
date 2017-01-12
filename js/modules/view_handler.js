
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

        });
        
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
    },

};





