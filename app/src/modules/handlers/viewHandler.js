

// View Handler
const _ = require( '../libaries/underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' );
class ViewHandler {
    
    // Ctor
    constructor( syncScrollHandler ) {
        this.focusedViews = [ _('#event-calendar-view').get(0), _('#location-category-view').get(0) ];
        this.mobileFocusedView = _('#event-calendar-view').get();
        
        if ( _('body').hasClass('mobile') ) this.changeMobileViewFocus( this.mobileFocusedView, true, false );
        else this.changeViewFocus( this.focusedViews[0], this.focusedViews[1], true, false, true );
        if ( syncScrollHandler != null ) this.syncScroll = syncScrollHandler;
    }
    
    // Change view focus
    changeViewFocus( leftView, rightView, fromLeft, fromRight, notrans ) {
        if ( _('body').hasClass('mobile') ) {
            this.changeMobileViewFocus( leftView, fromLeft, fromRight );
            return;
        }
        
        if ( fromLeft == null && fromRight == null ) fromLeft = true;
        
        if ( typeof leftView === 'string' )
            leftView = document.getElementById( leftView );
        
        if ( typeof rightView === 'string' )
            rightView = document.getElementById( rightView );
        
        if ( this.focusedViews[0] === leftView &&
             this.focusedViews[1] === rightView ) {
            this.focusedViews[0].classList.add('notrans');
            this.focusedViews[1].classList.add('notrans');
            this.focusedViews[0].style.transform = 'translate(0,0)';
            this.focusedViews[1].style.transform = 'translate(100%, 0)';
            this.focusedViews[0].classList.remove('notrans');
            this.focusedViews[1].classList.remove('notrans');
            return;
        }
        
        // For old views
        if ( ! ( this.focusedViews[0] === rightView || this.focusedViews[1] === leftView ) ) {
            if ( fromLeft ) {
                setTimeout(() => {
                    this.focusedViews[0].style.transform = 'translate(200%, 0)';
                    this.focusedViews[1].style.transform = 'translate(300%, 0)';
                    
                    if ( this.focusedViews[0].id !== leftView.id && this.focusedViews[0].id !== rightView.id ) {
                        let prevFocus = this.focusedViews[0];
                        setTimeout(() => {
                            prevFocus.classList.add('notrans');
                            prevFocus.style.transform = 'translate(-100%, 0px)';
                            setTimeout(() => { prevFocus.classList.remove('notrans'); }, 15);
                        }, parseFloat( window.getComputedStyle( this.focusedViews[0], null ).transitionDuration ) * 1000 + 10 );
                    }
                    
                    if ( this.focusedViews[1].id !== leftView.id && this.focusedViews[1].id !== rightView.id ) {
                        let prevFocus = this.focusedViews[1];
                        setTimeout(() => {
                            prevFocus.classList.add('notrans');
                            prevFocus.style.transform = 'translate(-100%, 0px)';
                            setTimeout(() => { prevFocus.classList.remove('notrans'); }, 15);
                        }, parseFloat( window.getComputedStyle( this.focusedViews[1], null ).transitionDuration ) * 1000 + 10 );
                    }
                    
                }, 0);
            }

            if ( fromRight ) {
                setTimeout(() => {
                    this.focusedViews[0].style.transform = 'translate(-200%, 0)';
                    this.focusedViews[1].style.transform = 'translate(-100%, 0)';
                }, 0);
            }
            
            // Adds notrans classes, if param is set
            leftView.classList.add('notrans');
            rightView.classList.add('notrans');

            if ( fromLeft ) {
                leftView.style.transform = 'translate(-200%,0)';
                rightView.style.transform = 'translate(-100%, 0)';
            }

            if ( fromRight ) {
                leftView.style.transform = 'translate(200%, 0)';
                rightView.style.transform = 'translate(300%, 0)';
            }
            
        } else {
            
            leftView.classList.add('notrans');
            rightView.classList.add('notrans');
            
            if ( this.focusedViews[0] == rightView ) {
                fromLeft = true;
                fromRight = false;
                leftView.style.transform = 'translate(-100%,0)';
                this.focusedViews[1].style.transform = 'translate(200%,0)';

                if ( this.focusedViews[1].id !== leftView.id && this.focusedViews[1].id !== rightView.id ) {
                    let prevFocus = this.focusedViews[1];
                    setTimeout(() => {
                        prevFocus.classList.add('notrans');
                        prevFocus.style.transform = 'translate(-100%, 0px)';
                        setTimeout(() => { prevFocus.classList.remove('notrans'); }, 15);
                    }, parseFloat( window.getComputedStyle( this.focusedViews[1], null ).transitionDuration ) * 1000 + 10 );
                }
                
            } else if ( this.focusedViews[1] == leftView ) {
                fromLeft = false;
                fromRight = true;
                rightView.style.transform = 'translate(200%,0)';
                this.focusedViews[0].style.transform = 'translate(-100%,0)';
            }
            
        }
        
        if ( !notrans ) {
            setTimeout(() => {
                leftView.classList.remove( 'notrans' );
                rightView.classList.remove( 'notrans' );
            }, 15);
        }
        
        // Brings new views into view
        setTimeout(() => {
            leftView.style.transform = 'translate(0%,0)';
            rightView.style.transform = 'translate(100%,0)';
            
            // Remove notrans classes
            this.focusedViews[0].classList.remove('notrans');
            this.focusedViews[1].classList.remove('notrans');
            leftView.classList.remove('notrans');
            rightView.classList.remove('notrans');

            // Rescales containers
            this.focusedViews = [ leftView, rightView ];
            if ( this.syncScroll != null ) {
                setTimeout( () => { this.syncScroll.rescaleContainer( this.focusedViews ) }, 100 );
            }

        }, 30);
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









