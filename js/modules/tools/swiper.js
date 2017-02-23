// Smamo slider, as jquery prototype function.
jQuery.prototype.smamo_slider = function( params ) {
    
    // Params
    var prevButton = typeof params.prevButton !== 'undefined' ? $(params.prevButton, this) : null,
        nextButton = typeof params.nextButton !== 'undefined' ? $(params.nextButton, this) : null,
        wrapAround = typeof params.wrapAround !== 'undefined' ? params.wrapAround : true;
        
        outer = $(this),
        inner = $('.inner', this).length > 0 ? $('.inner', this) : null,
        elems = [],
        
        currentIndex = 0;
    
    // Error if .inner is not found
    if ( inner !== null ) {
        
        // Generates elems array
        var resetElemsArray = function( ) {
            while ( elems.length > 0 ) elems.pop();
            $('.item', this).each( function( index, item ) {
                elems.push( $(item) ); });
        }.bind(this); resetElemsArray();
        
        
        /* --------------------------------------- */
        // Functions
        
        // Moves item to different location
        $(this).__proto__.moveItem = function( elem, insertAfter ) {
            
            // Sets vars
            elem = typeof elem === 'number' ? elems[ elem ] : elem;
            insertAfter = typeof insertAfter === 'number' && insertAfter !== -1 ? elems[ insertAfter ] : insertAfter;
            
            // Insert elem copy
            elem.remove();
            if ( insertAfter === -1 ) elem.insertBefore( elems[ 0 ] );
            else elem.insertAfter( insertAfter );
            
            // Resets elems array
            resetElemsArray();
            
        };
        
        // Change Index function, 'snap to'.
        inner.__proto__.changeIndex = function( index ) {
            
            if ( wrapAround ) {
                
                inner.addClass('notrans');
                
                // Loops around, with cloning
                var maxIndex = ( elems.length - Math.floor( outer.innerWidth() / elems[0].outerWidth() ) );
                if ( index >= maxIndex  ) {
                    $(this).moveItem(0,elems.length-1);
                    index = maxIndex;
                    inner.css({ 'left' : -( elems[ index-1 ].position().left ) + 'px' });
                } else if ( index <= 0 ) {
                    $(this).moveItem(elems.length-1,-1);
                    index = 0;
                    inner.css({ 'left' : -( elems[ index+1 ].position().left ) + 'px' });
                }
                
                console.log( index );
                
                // Resets inner
                inner.removeClass( 'notrans' );
                currentIndex = index;
                
            } else {
                
                // Loops around, without cloning
                var maxIndex = ( elems.length - Math.floor( outer.innerWidth() / elems[0].outerWidth() ) );
                currentIndex = index < 0 ? maxIndex : 
                        ( index > maxIndex ? 0 : index );
            
            }
                
            // Changes left pos of inner
            inner.css({ 'left' : -( elems[ currentIndex ].position().left ) + 'px', });
            
        }; inner.changeIndex( currentIndex );
        
        // Functions end
        /* --------------------------------------- */
        
        // Button action!
        prevButton.on( 'click', function() { currentIndex--; inner.changeIndex( currentIndex ); });
        nextButton.on( 'click', function() { currentIndex++; inner.changeIndex( currentIndex ); });
        
        // Mouse drag variables
        var clicking = false,
            innerStartX = null,
            startPositionX = null,
            distanceX = null,
            history = [ ];

        // Mouse down
        inner.on( 'mousedown', function( e ) {
            inner.addClass('notrans');
            
            // Sets fields
            clicking = true;
            innerStartX = inner.position().left;
            startPositionX = e.pageX; // - inner.offset().left;
            
        });
            
        // Mousemove
        $('.content-container').on( 'mousemove', function( e ) {
            if ( !clicking ) return;
            
            // Sets fields
            distanceX = e.pageX - startPositionX;
            
            // Moves the inner elem
            inner.css({
                'left' : innerStartX + distanceX + 'px',
            });
            
            if( -(inner.position().left) < 0 ) inner.css( 'left', '0px' );
            if( inner.position().left < -(inner.outerWidth() - outer.innerWidth()) ) inner.css( 'left', -( inner.outerWidth() - outer.innerWidth() ) );
            
            history.push([ inner.position().left, new Date().getTime() ]);
            
        });
        
        // Mouse up
        // inner.on( 'mouseleave', function() { inner.trigger('mouseup'); });
        inner.on( 'mouseup', function( e ) {
            inner.removeClass( 'notrans' );
            
            // Sets fields
            clicking = false;
            
            // Accel value
            var accel = null;
            for ( var index = history.length-1; index >= 0; index-- ) {
                var now = new Date().getTime(), timing = 280;
                accel = ( inner.position().left - history[index][0] ) / ( now - history[index][1] ) * ( timing / 4 * 3 );
                if ( now - history[index][1] > timing ) { break; }
            }
            
            // Snaps view
            var lowestDistElem = null, lowestDistIndex = null, lowestDist = null;
            elems.forEach( function( item, index ) {
                var dist = Math.abs( item.position().left + inner.position().left + accel );
                if ( dist < lowestDist || lowestDistElem === null ) {
                    lowestDistElem = item;
                    lowestDistIndex = index;
                    lowestDist = dist;
                }
            });
            
            var loc = 0;
            if( lowestDistElem.position().left < 0 ) loc = 0;
            else if( -lowestDistElem.position().left < -($(this).outerWidth() - outer.innerWidth()) ) loc = -( $(this).outerWidth() - outer.innerWidth() );
            else loc = -lowestDistElem.position().left;
            
            inner.css({ 'left' : loc + 'px' });
            currentIndex = lowestDistIndex;
            
            // Clears history, optimization
            while ( history.length > 0 ) history.pop();
            
        });
        
    } else { return -1; }
    
};