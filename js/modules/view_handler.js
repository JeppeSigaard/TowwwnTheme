
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        ready: false,
        poly_view: false,
        content_container: $('.content-container'),
        left_container: $('.left-container .content'),
        right_container: $('.right-container .content'),
        views: [], ls: 0,
    },
    
    // Init
    init: function() {
        
        $('.container-section').each(function( iter, elem ) {
            this.settings.views.push( $(elem) );
        }.bind(this));

        // Load event single view
        var event_sv, lastScroll = 0, isNew = false;
        $(document).on( 'click', '.event', function() {

            ViewHandler.settings.right_container.addClass('spoopy');

            EventSingleModule.render_sv_event( $(this).attr('id') );
            EventSingleModule.bindUIActions();
        
            setTimeout(function(){
                syncScroll.rescaleContainer();
                syncScroll.setHorizontalPosition();

                $(window).trigger('scroll');
            },250);

            ViewHandler.toggle_poly_view( true );

        });
        this.settings.ready = true;
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    
    // Change focus
    change_view_focus: function( viewIndex ) {
        var cls = -( $('.content-container-inner').position().left ),
            crs = cls + $('.content-container').innerWidth();
        
        if ( typeof viewIndex === 'number' ) {
            var elem = this.settings.views[viewIndex],
                elem_ls = elem.position().left,
                elem_rs = elem.position().left + elem.innerWidth();
            
            if ( elem_ls < cls ) {
                this.settings.ls = -elem_ls;
                $('.content-container-inner').css({ 'left': this.settings.ls + 'px' });
            } else if ( elem_rs > crs ) {
                this.settings.ls = -( elem_rs - $('.content-container').innerWidth() );
                $('.content-container-inner').css({ 'left': this.settings.ls + 'px' });
            }
        } else if ( typeof viewIndex === 'object' ) {
            viewIndex.sort(function( a, b ) { 
                if ( a < b ) return -1;
                if ( a > b ) return 1;
                return 0;
            }); 
            
            var lowElem = this.settings.views[viewIndex[0]],
                highElem = this.settings.views[viewIndex[viewIndex.length-1]],
                from = lowElem.position().left,
                to = highElem.position().left + highElem.innerWidth(),
                width = Math.abs( to - from );
            
            this.settings.ls = -( from - ( $('.content-container').innerWidth() - width ) / 2 );
            $('.content-container-inner').css({ 'left': this.settings.ls + 'px' });
        }
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
                $(window).trigger('resize');
            }, 300);
        }
    },

};





