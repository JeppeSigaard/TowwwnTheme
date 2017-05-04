

// Event Handler
const _ = require( '../libaries/underscore/underscore_main.js' );
class ExtraEventHandlers {
    
    // Ctor
    constructor() {
        _(window).on( 'scroll', this.onScroll.bind(this) );
        _(window).on( 'resize', this.onResize.bind(this) );
    }
    
    // On resize
    onResize() {
        if ( _(window).width() <= 640 ) _('body').addClass('mobile');
        else _('body').removeClass('mobile');
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
