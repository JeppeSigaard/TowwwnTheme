

// View Handler
const _ = require( '../libaries/underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' );
class ViewHandler {

    // Ctor
    constructor( left, right, mobile ) {

        const initialLeftView = ( left != null ) ? '#' + left : '#event-calendar-view',
              initialRightView = ( right != null ) ? '#' + right : '#location-category-view',
              initialMobileView = (mobile != null ) ? '#' + mobile : '#event-calendar-view';

        this.focusedViews = [ _(initialLeftView).get(0), _(initialRightView).get(0) ];
        this.mobileFocusedView = _(initialMobileView).get();

        if ( _('body').hasClass('mobile') ) this.changeMobileViewFocus( this.mobileFocusedView, true, false );
        else this.changeViewFocus( this.focusedViews[0], this.focusedViews[1], true, false, true );
    }

    // Change view focus
    changeViewFocus( leftView, rightView, fromLeft, fromRight, notrans ) {
        if ( _('body').hasClass('mobile') ) {
            this.changeMobileViewFocus( leftView, fromLeft, fromRight );
            return;
        }

        if ( notrans ) {
            _( leftView ).addClass('notrans').get(0).offsetHeight;
            _( rightView ).addClass('notrans').get(0).offsetHeight;

            if ( this.focusedViews.length > 1 ) {
                _( this.focusedViews[0] ).addClass('notrans').get(0).offsetHeight;
                _( this.focusedViews[1] ).addClass('notrans').get(0).offsetHeight;
            }
        }

        let leftFocused = false, rightFocused = false;
        if ( this.focusedViews.length > 1 ) {
            if ( this.focusedViews.includes( leftView ) && this.focusedViews.includes( rightView ) ) {
                Globals.syncScroll.wrapElems();
                Globals.syncScroll.rescaleContainer( [ _( leftView ).get(0), _( rightView ).get(0) ] );
                return;
            }

            if ( this.focusedViews[0] === leftView ) {
                fromLeft = true; fromRight = false;
                rightFocused = true;
            }

            if ( this.focusedViews[0] === rightView ) {
                fromLeft = true; fromRight = false;
                rightFocused = true;
            }

            if ( this.focusedViews[1] === rightView ) {
                fromLeft = false; fromRight = true;
                leftFocused = true;
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

        if ( !notrans ) {
            _( leftView ).addClass('notrans');
            _( rightView ).addClass('notrans');
        }

        if ( fromLeft ) {
            if ( !rightFocused ) {
                _( leftView ).css({ 'left' : '-100%' })
                _( rightView ).css({ 'left' : '-50%' });
            } else {
                _( leftView ).css({ 'left' : '-50%' });
                _( rightView ).css({ 'left' : '0' });
            }
        }

        if ( fromRight ) {
            if ( !leftFocused ) {
                _( leftView ).css({ 'left' : '100%' });
                _( rightView ).css({ 'left' : '150%' });
            } else {
                _( leftView ).css({ 'left' : '50%' });
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

        if ( !notrans ) {
            _( leftView ).removeClass('notrans');
            _( rightView ).removeClass('notrans');
        }

        _( leftView ).css({ 'left': '0' });
        _( rightView ).css({ 'left': '50%' });

        _( leftView ).get(0).offsetHeight;
        _( rightView ).get(0).offsetHeight;

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

        Globals.syncScroll.wrapElems();
        Globals.syncScroll.rescaleContainer( [ _( leftView ).get(0), _( rightView ).get(0) ] );
        return;

    }

    // Change mobile view focus
    changeMobileViewFocus( activeView, fromLeft, fromRight ) {

        // Error if screen is less than 640px wide
        if ( !_('body').hasClass('mobile') ) {
            throw "ViewHandler: Using change mobile focus on screen with a width of more than 640px";
            return;
        }

        // Checks if the new views is already is in focus
        if ( _(activeView).hasClass('active') ) {
            throw "ViewHandler: View is already in focus";
            return;
        }

        Globals.setMainState({ currentMobileView : activeView });

        // Adds needed classes
        _(this.mobileFocusedView).removeClass('active notrans');
        _(activeView).addClass('notrans active');

        // Sets starting position for new view
        if ( fromLeft ) _(activeView).css({ transform : 'translate(-100%,0)' });
        if ( fromRight ) _(activeView).css({ transform : 'translate(100%,0)' });

        // Timeout
        setTimeout(() => {
            _(activeView).removeClass('notrans');

            // Translates view in
            if ( fromLeft ) _(this.mobileFocusedView).css({ transform : 'translate(100%,0)' });
            if ( fromRight ) _(this.mobileFocusedView).css({ transform : 'translate(-100%,0)' });
            _(activeView).css({ transform : 'translate(0,0)' });

            // Sets new focused view
            this.mobileFocusedView = activeView;
        }, 10);

    }

} module.exports = ViewHandler;









