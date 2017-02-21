
jQuery.prototype.smamo_slider = function( options ) {
    
    var outerView = $(this).css({ 'position' : 'relative', 'overflow' : 'hidden' }),
        innerView = outerView.children()[0].css({ 'position' : 'absolute' }),
        elems = innerView.children(),
        touchstartX = null, touchstartY = null,
        touchposX = null, containerposX = null,
        timestart = null, viewLocked = false,
        tolerance = 1 - ( typeof options.tolerance === 'undefined' ? 0.5 : options.tolerance );
        
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

        if ( xDirection <= tolerance && xDirection >= -tolerance && distance > 30 ) {
            changeable = false;
        }
          
        if ( ((( xDirection > tolerance || xDirection < -tolerance )) || changed) && changeable ) {
            $('.content-container-inner').css({ 'left': ( containerposX - Math.abs( distanceX ) * xDirection ) + 'px' });
            changed = true;

            if(!viewLocked){
                viewLocked = true;
                syncScroll.lockView();
            }

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

      $(window).trigger('resize');
    });

    $('.content-container').on( 'touchend', function(e) {
      changed = false;
      changeable = true;
      touchstartX = null;
      touchstartY = null;
      containerposX = null;

      var lowestDistance = null, lowestElem = null, lowestElemCenter = null, date = new Date(),
          containerCenter = (-($('.content-container-inner').position().left) + $('.content-container').outerWidth() / 2)
            + (20000 /  (date.getTime() - timestart) * xDirection); // Change this... Really, its bad:((
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

      $('.content-container-inner').removeClass('notrans');

    });
    
}
