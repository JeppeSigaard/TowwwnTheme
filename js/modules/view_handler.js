
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        ready: false,
        poly_view: false,
        content_container: $('.content-container'),
        
        event_calender: $('#section1 .content'),
        event_singleview: $('#section0 .content'),
        location_categories: $('#section2 .content'),
        location_listview: $('#section3 .content'),
        location_singleview: $('#section4 .content'),
        
        event_calender_outer: $('#section1'),
        event_singleview_outer: $('#section0'),
        location_categories_outer: $('#section2'),
        location_listview_outer: $('#section3'),
        location_singleview_outer: $('#section4'),  
        
        views: [], 
        ls: $('.content-container-inner').position().left,
        centered_view: [ 1, 2 ],
    },
    
    // Init
    init: function() {
        
        // Generates view array
        $('.container-section').each(function( iter, elem ) {
            this.settings.views.push( $(elem) );
        }.bind(this));
        
        // Loads swipe functionality
        this.swipe();

        // Load event single view
        var event_sv, lastScroll = 0, isNew = false;
        $(document).on( 'click', '.event', function() {
            ViewHandler.settings.event_singleview.addClass('spoopy');

            EventSingleModule.render_sv_event( $(this).attr('id'), function() {
                ViewHandler.change_view_focus( 0 );
                ViewHandler.settings.event_calender_outer.addClass( 'normalize' );
                ViewHandler.settings.location_categories_outer.addClass( 'normalize' );
            }, $(this));
            
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
    change_view_focus: function( viewIndex, forceLeft, forceRight ) {
        var cls = -( $('.content-container-inner').position().left ),
            crs = cls + $('.content-container').innerWidth();
        
        if ( typeof viewIndex === 'number' ) {
            var elem = this.settings.views[viewIndex],
                elem_ls = elem.position().left,
                elem_rs = elem.position().left + elem.innerWidth();
            
            if ( forceLeft ) {
                this.settings.ls = -elem_ls;
                $('.content-container-inner').css({ 'left': this.settings.ls + 'px' });
            } else if ( forceRight ) {
                this.settings.ls = -( elem_rs - $('.content-container').innerWidth() );
                $('.content-container-inner').css({ 'left': this.settings.ls + 'px' });
            } else if ( elem_ls < cls ) {
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
        
        var interval = setInterval( function() {
            $(window).trigger('resize');
        }, 1000 / 120 );
        
        setTimeout( function() { 
            clearInterval( interval );
        }, 400 );
    },
    
    // Swipe functionlaity
    swipe: function() {
        
        var elems = this.settings.views,
            touchstartX = null, touchstartY = null,
            touchposX = null, containerposX = null,
            timestart = null;
        
        $('.content-container').on( 'touchstart', function(e) {
            $('.content-container-inner').addClass('notrans');
            touchstartX = e.touches[0].pageX;
            touchstartY = e.touches[0].pageY;
            touchposX = touchstartX - $('.content-container-inner').position().left;
            containerposX = $('.content-container-inner').position().left;
            timestart = new Date().getTime();
        });

        var changed = false, changeable = true, xDirection = 0;
        $('.content-container').on( 'touchmove', function( e ) {
          if ( touchstartX !== null && touchstartY !== null ) {
            var distanceX = touchstartX - e.touches[0].pageX , 
                distanceY = touchstartY - e.touches[0].pageY,
                distance = Math.sqrt( distanceX * distanceX + distanceY * distanceY ),
                direction = Math.atan2( distanceY, distanceX );

            xDirection = Math.cos( direction );

            if ( ((( xDirection > 0.85 || xDirection < -0.85 )) || changed) && changeable ) {
              $('.content-container-inner').css({ 'left': ( containerposX - Math.abs( distanceX ) * xDirection ) + 'px' });
              changed = true;
            } else if ( distance > 30 ) {
              changeable = false;
            }
          }

          if( -($('.content-container-inner').position().left) < 0 ) {
            $('.content-container-inner').css({ 'left': 0 });    
          } if ( -($('.content-container-inner').position().left) + $('.content-container').innerWidth() >
                 $('.content-container-inner').outerWidth()) {
            $('.content-container-inner').css({ 'left': -($('.content-container-inner').outerWidth() - $('.content-container').innerWidth()) + 'px' });
          }
        });

        $('.content-container').on( 'touchend', function(e) {
          changed = false;
          changeable = true;
          touchstartX = null;
          touchstartY = null;
          containerposX = null;

          var lowestDistance = null, lowestElem = null, lowestElemCenter = null, date = new Date(),
              containerCenter = (-($('.content-container-inner').position().left) + $('.content-container').outerWidth() / 2)
                + (20000 /  (date.getTime() - timestart) * xDirection);
          for ( var iter = 0; iter < elems.length; iter++ ) {
            var elemCenter = elems[iter].position().left + elems[iter].outerWidth() / 2;
            if ( lowestDistance === null || Math.abs( containerCenter - elemCenter ) < lowestDistance ) {
              lowestDistance = Math.abs( containerCenter - elemCenter );
              lowestElem = elems[iter];
              lowestElemCenter = elemCenter;
            }
          }

          $('.content-container-inner').addClass('transition');
          $('.content-container-inner').css({ 'left': -( lowestElemCenter - $('.content-container').outerWidth() / 2 ) + 'px' });
          setTimeout(function() {
            $('.content-container-inner').removeClass('transition');
          }, 250);
          
          $('.content-container-inner').removeClass('notrans');

        });
        
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
        this.toggle_poly_view( false );
        this.change_view_focus( 1, true, false );
        this.settings.event_calender_outer.removeClass('normalize');
        this.settings.location_categories_outer.removeClass('normalize');
        
        setTimeout(function(){
            this.settings.event_singleview.html('');
        }.bind(this), 400);
        
        if ( syncScroll.settings.inner !== null ) {
            setTimeout(function() {
                syncScroll.rescaleContainer();
                $(window).trigger('resize');
            }, 300);
        }
    },

};





