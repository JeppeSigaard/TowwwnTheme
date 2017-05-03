
// View handler
var ViewHandler = {
    
    // Fields
    settings: {
        ready: false,
        poly_view: false,
        content_container: $('.content-container'),
<<<<<<< HEAD
        
=======

>>>>>>> origin/internalscroll
        event_calender: $('#section1 .content'),
        event_singleview: $('#section0 .content'),
        location_categories: $('#section2 .content'),
        location_listview: $('#section3 .content'),
        location_singleview: $('#section4 .content'),
<<<<<<< HEAD
        
=======

>>>>>>> origin/internalscroll
        event_calender_outer: $('#section1'),
        event_singleview_outer: $('#section0'),
        location_categories_outer: $('#section2'),
        location_listview_outer: $('#section3'),
<<<<<<< HEAD
        location_singleview_outer: $('#section4'),  
        
        views: [], 
=======
        location_singleview_outer: $('#section4'),

        views: [],
>>>>>>> origin/internalscroll
        ls: $('.content-container-inner').position().left,
        centered_view: [ 1, 2 ],
        currentIndex: 1,
        forcedLeft: false,
        forcedRight: false,
    },
    
    // Init
    init: function() {
        
        // Generates view array
        $('.container-section').each(function( iter, elem ) {
            this.settings.views.push( $(elem) );
        }.bind(this));
<<<<<<< HEAD
        
        // Loads swipe functionality
        this.swipe();

        // Reloads current view to fit mobile screen sizes
        var lastSize = $(window).innerWidth();
        $(window).on( 'resize', function() {
            if ( ( $(window).innerWidth() <= 640 && lastSize > 640 ) || ( $(window).innerWidth() > 640 && lastSize <= 640 ) ) {
                setTimeout( function() {
                    this.change_view_focus( this.settings.currentIndex, this.settings.forcedLeft, this.settings.forcedRight );
                }.bind(this), 400);
            } lastSize = $(window).innerWidth();
        }.bind(this));

=======

        // Loads swipe functionality
        this.swipe();

        // Reloads current view to fit mobile screen sizes
        var lastSize = $(window).innerWidth();
        $(window).on( 'resize', function() {
            if ( ( $(window).innerWidth() <= 640 && lastSize > 640 ) || ( $(window).innerWidth() > 640 && lastSize <= 640 ) ) {
                setTimeout( function() {
                    this.change_view_focus( this.settings.currentIndex, this.settings.forcedLeft, this.settings.forcedRight );
                }.bind(this), 400);
            } lastSize = $(window).innerWidth();
        }.bind(this));

>>>>>>> origin/internalscroll
        // Swipes from categories to events on load
        var elem = $('.content-container-inner', this.settings.content_container);
        elem.addClass('notrans');
        this.change_view_focus( 2 );
        elem.removeClass('notrans');
        this.change_view_focus( 1 );

        this.settings.ready = true;
    },
    
    // Bind UI Actions
    bindUIActions: function() {
    },
    
    // Change focus
    change_view_focus: function( viewIndex, forceLeft, forceRight ) {
        let syncScroll = require( './tools/sync_scroll.js' );
        let ImageController = require( './handlers/imageController.js' );

        this.settings.currentIndex = viewIndex;
        this.settings.forcedLeft = forceLeft;
        this.settings.forcedRight = forceRight;
        var cls = -( $('.content-container-inner').position().left ),
            crs = cls + $('.content-container').innerWidth();
<<<<<<< HEAD
        
=======

>>>>>>> origin/internalscroll
        if ( typeof viewIndex === 'number' ) {
            var elem = this.settings.views[viewIndex],
                elem_ls = elem.position().left,
                elem_rs = elem.position().left + elem.innerWidth();
<<<<<<< HEAD
            
=======

>>>>>>> origin/internalscroll
            if ( forceLeft ) {
                this.settings.ls = -( elem_ls / $('.content-container').innerWidth() * 100 );
                $('.content-container-inner').css({ 'left': this.settings.ls + '%' });
            } else if ( forceRight ) {
                this.settings.ls = -( ( elem_rs - $('.content-container').innerWidth() ) / $('.content-container').innerWidth() * 100 );
                $('.content-container-inner').css({ 'left': this.settings.ls + '%' });
            } else if ( elem_ls < cls ) {
                this.settings.ls = -( elem_ls / $('.content-container').innerWidth() * 100 );
                $('.content-container-inner').css({ 'left': this.settings.ls + '%' });
            } else if ( elem_rs > crs ) {
                this.settings.ls = -( ( elem_rs - $('.content-container').innerWidth() ) / $('.content-container').innerWidth() * 100 );
                $('.content-container-inner').css({ 'left': this.settings.ls + '%' });
            }
<<<<<<< HEAD
            
        } else if ( typeof viewIndex === 'object' ) {
            viewIndex.sort(function( a, b ) { 
                if ( a < b ) return -1;
                if ( a > b ) return 1;
                return 0;
            }); 
            
=======

        } else if ( typeof viewIndex === 'object' ) {
            viewIndex.sort(function( a, b ) {
                if ( a < b ) return -1;
                if ( a > b ) return 1;
                return 0;
            });

>>>>>>> origin/internalscroll
            var lowElem = this.settings.views[viewIndex[0]],
                highElem = this.settings.views[viewIndex[viewIndex.length-1]],
                from = lowElem.position().left,
                to = highElem.position().left + highElem.innerWidth(),
                width = Math.abs( to - from );
<<<<<<< HEAD
            
=======

>>>>>>> origin/internalscroll
            this.settings.ls = -( ( from - ( $('.content-container').innerWidth() - width ) / 2 ) );
            $('.content-container-inner').css({ 'left': this.settings.ls + 'px' });
        }


        syncScroll.lockView();
        setTimeout(function(){
            syncScroll.releaseView();
            ImageController.lazyLoad();
        }, 420);
    },
<<<<<<< HEAD
    
    // Swipe functionlaity
    swipe: function() {
        
=======

    // Swipe functionlaity
    swipe: function() {

>>>>>>> origin/internalscroll
        // add rudimentary swipe for mouse (prolly improve, k fam?)
        /*var mousePos = false, canSwipe = false;
        $('.content-container').on('mousedown',function(e){
            mousePos = e.pageX; canSwipe = true;
            setTimeout(function(){canSwipe = false;},500);
        }).on('mouseup',function(e){ if(canSwipe){
            var mousemoved = e.pageX - mousePos, curLeft, length = $('.container-section').length - 1;
            $('.container-section').each(function(){ if($(this).offset().left === 0){ curLeft = $(this).index(); } });
            if(mousemoved > 30){ curLeft --; if(curLeft < 0){curLeft = 0;} this.change_view_focus(curLeft, true); }
            if(mousemoved < -30){ curLeft ++; if(curLeft > length){curLeft = length;} this.change_view_focus(curLeft, true); }
            mousepos = false;
            HelpFunctions.clearSelection();
        }}.bind(this));*/
        // end shoddy mouse stuff

        var elems = this.settings.views,
            touchstartX = null, touchstartY = null,
            touchposX = null, containerposX = null,
            timestart = null,
            viewLocked = false,
            too_fast = false;
<<<<<<< HEAD
        
=======

>>>>>>> origin/internalscroll
        $('.content-container').on( 'touchstart', function(e) {

            too_fast = true;
            setTimeout(function(){too_fast = false;},100);

            $('.content-container-inner').addClass('notrans');
            touchstartX = e.touches[0].pageX;
            touchstartY = e.touches[0].pageY;
            touchposX = touchstartX - $('.content-container-inner').position().left;
            containerposX = $('.content-container-inner').position().left;
            timestart = new Date().getTime();
        });

        var changed = false, changeable = true, xDirection = 0, yDirection = 0;
        $('.content-container').on( 'touchmove', function( e ) {
          if ( touchstartX !== null && touchstartY !== null ) {
<<<<<<< HEAD
            var distanceX = touchstartX - e.touches[0].pageX , 
=======
            var distanceX = touchstartX - e.touches[0].pageX ,
>>>>>>> origin/internalscroll
                distanceY = touchstartY - e.touches[0].pageY,
                distance = Math.sqrt( distanceX * distanceX + distanceY * distanceY ),
                direction = Math.atan2( distanceY, distanceX );

            xDirection = Math.cos( direction );
            var tolerance = .95;

            if ( xDirection <= tolerance && xDirection >= tolerance && distance > 30 ) {
                changeable = false;
            }

            if ( ((( xDirection > tolerance || xDirection < -tolerance )) || changed) && changeable ) {
                $('.content-container-inner').css({ 'left': ( containerposX - Math.abs( distanceX ) * xDirection ) + 'px' });
                changed = true;

                if(!viewLocked){
                    viewLocked = true;
                    syncScroll.lockView();
                }

                e.stopPropagation();
                return false;

            } else if ( distance > 30 ) {
              changeable = false;
            }
          }

          if( -($('.content-container-inner').position().left) < 0 ) {
<<<<<<< HEAD
            $('.content-container-inner').css({ 'left': 0 });    
=======
            $('.content-container-inner').css({ 'left': 0 });
>>>>>>> origin/internalscroll
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

          var lowestDistance = null, lowestElem = null, lowestElemCenter = null, date = new Date();

          if ( !too_fast ) {
              var containerCenter = (-($('.content-container-inner').position().left) + $('.content-container').outerWidth() / 2)
                + (20000 /  (date.getTime() - timestart) * xDirection); // Change this... Really, its bad:((
          } else {
              var containerCenter = (-($('.content-container-inner').position().left) + $('.content-container').outerWidth() / 2); // Change this... Really, its bad:((
          }

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

              if(viewLocked){
                viewLocked = false;
                syncScroll.releaseView();
            }

          }, 250);
<<<<<<< HEAD
          
=======

>>>>>>> origin/internalscroll
          $('.content-container-inner').removeClass('notrans');

          too_fast = false;
        });
<<<<<<< HEAD
        
    },
    
=======

    },

>>>>>>> origin/internalscroll
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
    },

}; module.exports = ViewHandler;





