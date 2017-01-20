
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
        
        if ( activeOnly == true ) {
            if ( !this.settings.content_container.hasClass('poly-view') ) {
                $('.monthSelector').monthPicker({ remove: true });        
            }
            
            this.settings.content_container.addClass('poly-view');
            return;
        } else if ( activeOnly == false ) {
            if ( this.settings.content_container.hasClass('poly-view') ) {
                $('.monthSelector').monthPicker({ remove: true });        
            }
            
            this.settings.content_container.removeClass('poly-view');
            return;
        }

        if ( this.settings.content_container.hasClass( 'poly-view' ) ) {
            this.settings.content_container.removeClass( 'poly-view' );
        } else {
            this.settings.content_container.addClass( 'poly-view' );
        }
                
        $('.monthSelector').monthPicker({ remove: true });   
    },

    // Go to
    go_to: function( index ) {
    },

    // Reload view
    reload_view: function( timeout ) {
    },

    // Close single view
    closeSingleView: function() {
        this.settings.right_container.html('');
        this.toggle_poly_view( false );
        if ( syncScroll.settings.inner !== null ) {
            setTimeout(function() {
                syncScroll.rescaleContainer();
            }, 300);
        }
    },

};





