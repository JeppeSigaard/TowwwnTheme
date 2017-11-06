

// View Handler
const _ = require( '../libaries/underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' );
class ViewHandler {

    // Ctor
    constructor( left, right, mobile ) {

        const initialLeftView = ( left != null ) ?  left : '#event-calendar-view',
              initialRightView = ( right != null ) ? right : '#location-category-view',
              initialMobileView = (mobile != null ) ? mobile : '#event-calendar-view';

        console.log( initialLeftView, initialRightView );

        this.focusedViews = [];
        this.mobileFocusedView = initialMobileView;

        if(_('body').hasClass('mobile')){
            _(initialMobileView).css({left : 0});
            this.changeMobileViewFocus( initialMobileView);
        }

        else{
            _(initialLeftView).css({left : 0});
            _(initialRightView).css({left : '50%'});
            this.changeViewFocus( initialLeftView, initialRightView);
        }
    }

    // Change view focus
    changeViewFocus( leftView, rightView, fromLeft, fromRight, notrans, ignoreAutoDirection, leftSize, rightSize ) {

        // Uses change mobile view focus, if screen is less than x pixels
        if ( _('body').hasClass('mobile') ) {
            this.changeMobileViewFocus( leftView, fromLeft, fromRight );
            return;
        }

        // If both views, already is in view.. Don't do anything:))
        if ( this.focusedViews.includes( leftView ) &&
             this.focusedViews.includes( rightView ) ) return;

        // Uses manual change view focus if ignore auto direction is true
        if ( ignoreAutoDirection ) { this.manualChangeViewFocus( leftView, rightView ); return; }

        // Adds notrans classes
        if ( notrans ) {
            _( leftView ).addClass('notrans').get(0).offsetHeight;
            _( rightView ).addClass('notrans').get(0).offsetHeight;

            if ( this.focusedViews.length > 1 ) {
                _( this.focusedViews[0] ).addClass('notrans').get(0).offsetHeight;
                _( this.focusedViews[1] ).addClass('notrans').get(0).offsetHeight;
            }
        }

        // Checks if the any of views already is in focus
        let leftFocused = false, rightFocused = false;
        if ( this.focusedViews.length > 1 ) {

            if ( this.focusedViews[0] === leftView ) {
                fromLeft = true; fromRight = false;
                rightFocused = true;

                let copy = leftView;
                leftView = rightView;
                rightView = copy;
            }

            if ( this.focusedViews[0] === rightView ) {
                fromLeft = true; fromRight = false;
                rightFocused = true;
            }

            if ( this.focusedViews[1] === rightView ) {
                fromLeft = false; fromRight = true;
                leftFocused = true;

                let copy = leftView;
                leftView = rightView;
                rightView = copy;
            }

            if ( this.focusedViews[1] === leftView ) {
                fromLeft = false; fromRight = true;
                leftFocused = true;
            }

            if ( fromLeft && !leftFocused ) {
                _( this.focusedViews[0] ).css({ 'left': '100%' });
                _( this.focusedViews[1] ).css({ 'left': '150%' });
            }

            if ( fromRight && !rightFocused ) {
                _( this.focusedViews[0] ).css({ 'left': '-100%' });
                _( this.focusedViews[1] ).css({ 'left': '-50%' });
            }

            if ( leftFocused ) { _( this.focusedViews[0] ).css({ 'left': '-50%' }); }
            if ( rightFocused ) { _( this.focusedViews[1] ).css({ 'left': '100%' }); }

            let oldLeftFocus = this.focusedViews[0];
            if ( this.focusedViews[0] !== leftView && this.focusedViews[0] !== rightView ) {
                setTimeout(( ) => {
                    _( oldLeftFocus ).addClass('notrans').css({ 'left' : '-50%' });
                    _( oldLeftFocus ).get(0).offsetHeight;
                    _( oldLeftFocus ).removeClass('notrans');
                }, parseFloat( window.getComputedStyle( _( this.focusedViews[0] ).get(0) ).transitionDuration ) * 1000 );
            }

            let oldRightFocus = this.focusedViews[1];
            if ( this.focusedViews[1] !== leftView && this.focusedViews[1] !== rightView ) {
                setTimeout(( ) => {
                    _( oldRightFocus ).addClass('notrans').css({ 'left' : '-50%' });
                    _( oldRightFocus ).get(0).offsetHeight;
                    _( oldRightFocus ).removeClass('notrans');
                }, parseFloat( window.getComputedStyle( _( this.focusedViews[1] ).get(0) ).transitionDuration ) * 1000 );
            }

            window.cs = window.getComputedStyle( _( this.focusedViews[1] ).get(0) );
        }

        // Adds notrans classes
        if ( !notrans ) {
            _( leftView ).addClass('notrans');
            _( rightView ).addClass('notrans');
        }

        // Pre positions views
        if ( fromLeft ) {
            if ( !rightFocused ) {
                _( leftView ).css({ 'left' : '-100%' })
                _( rightView ).css({ 'left' : '-50%' });
            } else {
                _( leftView ).css({ 'left' : '-50%' });
                // _( rightView ).css({ 'left' : '0' });
            }
        }

        // Pre positions views
        if ( fromRight ) {
            if ( !leftFocused ) {
                _( leftView ).css({ 'left' : '100%' });
                _( rightView ).css({ 'left' : '150%' });
            } else {
                // _( leftView ).css({ 'left' : '50%' });
                _( rightView ).css({ 'left' : '100%' });
            }
        }

        // Forces the browser to run the css queue
        _( leftView ).get(0).offsetHeight;
        _( rightView ).get(0).offsetHeight;

        if ( this.focusedViews.length > 1 ) {
            _( this.focusedViews[0] ).get(0).offsetHeight;
            _( this.focusedViews[1] ).get(0).offsetHeight;
        }

        // If not notrans remove the classes
        if ( !notrans ) {
            _( leftView ).removeClass('notrans');
            _( rightView ).removeClass('notrans');
        }

        // Positions new views
        _( leftView ).css({ 'left': '0' });
        _( rightView ).css({ 'left': '50%' });

        // Forces browser to run css queue
        _( leftView ).get(0).offsetHeight;
        _( rightView ).get(0).offsetHeight;

        // Sets focused views
        this.focusedViews[0] = leftView;
        this.focusedViews[1] = rightView;

        if ( notrans ) {
            _( leftView ).removeClass('notrans');
            _( rightView ).removeClass('notrans');

            if ( this.focusedViews.length > 1 ) {
                _( this.focusedViews[0] ).removeClass('notrans');
                _( this.focusedViews[1] ).removeClass('notrans');
            }
        }

        Globals.hooks.trigger( 'viewChanged', [leftView, rightView]);
        return;
    }

    // Manual change view focus
    manualChangeViewFocus( leftView, rightView ) {
        if ( this.focusedViews[0] === leftView ) {

            // Prepositions views and sets z-index
            _( this.focusedViews[0] ).css({ 'z-index' : '10' }).get(0).offsetHeight;
            _( rightView ).addClass( 'notrans' ).css({ 'z-index' : '9', 'left' : '0' }).get(0).offsetHeight;
            _( rightView ).removeClass('notrans').get(0).offsetHeight;

            // Transitions views into right positions
            _( rightView ).css({ 'left' : '50%' });
            _( this.focusedViews[1] ).css({ 'left' : '100%' });

            _( this.focusedViews[0] ).css({ 'box-shadow' : '2px 0px 4px rgba(0,0,0,.2)' });

            // Resets prev focusedViews position
            setTimeout((( prevView ) => {
                _( prevView ).addClass( 'notrans' ).css({ 'left' : '-50%' }).get(0).offsetHeight;
                _( prevView ).removeClass( 'notrans' );
                _( this.focusedViews[0] ).css({ 'box-shadow' : '0px 0px 0px rgba(0,0,0,0)' });
            }).bind( this, this.focusedViews[1] ), parseFloat( _( this.focusedViews[1] ).style()[0].transitionDuration ) * 1000);

        } else if ( this.focusedViews[1] === rightView ) {

            // Prepositions views and sets z-index
            _( this.focusedViews[1] ).css({ 'z-index' : '10' }).get(0).offsetHeight;
            _( leftView ).addClass( 'notrans' ).css({ 'left' : '-50%' }).get(0).offsetHeight;
            _( this.focusedViews[0] ).css({ 'z-index' : '9' }).get(0).offsetHeight;

            // Transitions views into right positions
            _( leftView ).css({ 'left' : '0' });
            _( this.focusedViews[0] ).css({ 'left' : '50%' });

            _( this.focusedViews[1] ).css({ 'box-shadow' : '-2px 0px 4px rgba(0,0,0,.2)' });

            // Resets prev focusedViews position
            setTimeout((( prevView ) => {
                _( prevView ).addClass( 'notrans' ).css({ 'left' : '-50%' }).get(0).offsetHeight;
                _( prevView ).removeClass( 'notrans' );
                _( this.focusedViews[1] ).css({ 'box-shadow' : '0px 0px 0px rgba(0,0,0,0)' });
            }).bind(this, this.focusedViews[0]), parseFloat( _( this.focusedViews[0] ).style()[0].transitionDuration ) * 1000);

        } else {
            this.changeViewFocus( leftView, rightView, true, false, false, false );
            return;
        }

        this.focusedViews[0] = leftView;
        this.focusedViews[1] = rightView;
    }

    // Change mobile view focus
    changeMobileViewFocus( activeView, fromLeft, fromRight ) {

        // Adds needed classes
        if (null != this.mobileFocusedView ) _(this.mobileFocusedView).removeClass('notrans');
        _(activeView).addClass('notrans');
        _(activeView).get(0).offsetHeight;

        // Sets starting position for new view
        if ( fromLeft ) _(activeView).css({ left : '-100%' });
        if ( fromRight ) _(activeView).css({ left : '100%' });
        _(activeView).removeClass('notrans');
        _(activeView).get(0).offsetHeight;

        // Translates view in
        if ( fromLeft && null != this.mobileFocusedView  ) _(this.mobileFocusedView).css({ left : '100%' });
        if ( fromRight && null != this.mobileFocusedView  ) _(this.mobileFocusedView).css({ left : '-100%' });
        _(activeView).css({ left : '0' });

        // Forces queues to run
        _(activeView).get(0).offsetHeight;
        _(this.mobileFocusedView).get(0).offsetHeight;

        // Sets new focused view
        this.mobileFocusedView = activeView;
         _('.container-section').removeClass('active');
        _(activeView).addClass('active');
        Globals.setMainState({ currentMobileView : activeView });

        Globals.hooks.trigger( 'viewChanged', [activeView, null]);

    }

} module.exports = ViewHandler;
