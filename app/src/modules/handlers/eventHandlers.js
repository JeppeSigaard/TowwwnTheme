

// Event Handler
const _ = require( '../libaries/underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' );

class ExtraEventHandlers {

    // Ctor
    constructor() {
        _(window).on( 'scroll', this.onScroll.bind(this) );
        _(window).on( 'resize', this.onResize.bind(this) );
    }

    // On resize
    onResize() {

        if ( _(window).width() <= 769 && !_('body').hasClass('mobile') ){

            // Mobile view
            _('body').addClass('mobile');
            _('.container-section').css({width : '100%'});
            Globals.viewHandler.changeMobileViewFocus(Globals.viewHandler.focusedViews[0]);

            console.log(Globals);
        }

        else if ( _(window).width() > 769 && _('body').hasClass('mobile') ){

            // Desktop view
            _('body').removeClass('mobile');
            _('.container-section').css({width : '50%'});
            const view0 = Globals.viewHandler.mobileFocusedView,
                  view1 = (Globals.viewHandler.focusedViews[1] != null) ? Globals.viewHandler.focusedViews[1] : '#event-calendar-view';

            Globals.viewHandler.changeViewFocus(view0, view1);
        }
    }

    // On Scroll
    onScroll() {

        /* -------------------------------------------- */
        // HEADER STUFF START

//        let bp = _('#header').height() + _('#header').offset().top;
//        if ( window.pageYOffset >= bp ) {
//            _('#menu-show-btns').addClass('show').removeClass('active');
//            _('#site-header').addClass('fixed').removeClass('active');
//        } else {
//            _('#menu-show-btns').removeClass('show').removeClass('active');
//            _('#site-header').removeClass('fixed').removeClass('active');
//        }

        // HEADER STUFF END
        /* -------------------------------------------- */

    }

    // Handler anchor click
    handleAnchorClick( e ) {
        // console.log( e, this );
    }

} module.exports = ExtraEventHandlers;
