
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        ready: false,
        poly_view: false,
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

        });

        this.settings.ready = true;
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    

    // Go to
    go_to: function( index ) {

    },

    // Reload view
    reload_view: function( timeout ) {

    },

    // Close single view
    closeSingleView: function() {
        ViewHandler.settings.left_container.addClass('no-trans').removeClass('active');
        ViewHandler.settings.right_container.addClass('no-trans').css({'height': '0px'}).html('').removeClass('active');

        setTimeout(function() {
            ViewHandler.settings.left_container.removeClass('no-trans');
            ViewHandler.settings.right_container.removeClass('no-trans');
            this.reload_view( false );
        }.bind(this), 150);

        ViewHandler.go_to( 0 );
    },

};





