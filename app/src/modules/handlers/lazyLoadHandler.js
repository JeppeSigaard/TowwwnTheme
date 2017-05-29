


// Lazy load handler
const _ = require('../libaries/underscore/underscore_main.js');
class LazyLoadHandler {

    // Constructor
    constructor( selector ) {

        // Actually handling stuff
        this.selector = selector;
        _( selector ).on( 'scroll', this.onscroll.bind(this) );
    }

    // Trigger load
    triggerload() { this.onscroll.call(this); }

    // On scroll
    onscroll() {

        let outer = _( this.selector ).get(0),
            elems = _( this.selector + ' [data-image-src]' );

        if ( elems === false ) return;
        else elems = elems.get();

        for ( let elem of elems ) {
            if ( this.isInView( elem, 200 ) ) {
                let uElem = _( elem ),
                    imgSrc = uElem.attr('data-image-src'),
                    imgPlaceholder = new Image();

                imgPlaceholder.onload = function() {
                    uElem.css({ 'background-image' : 'url('+ imgSrc +')' });
                    uElem.removeClass('loading-image', '1');
                }

                uElem.removeAttr( 'data-image-src' );
                uElem.addClass('loading-image', '1');
                imgPlaceholder.src = imgSrc;
            }
        }
    }

    // In view
    isInView(element, preloadDistance) {
        let elemTop = element.getBoundingClientRect().top,
            elemBottom = element.getBoundingClientRect().bottom,
            preload = ( preloadDistance != null ) ? preloadDistance : 0,
            isVisibleY = (elemTop >= 0 - preload) && (elemBottom <= window.innerHeight + element.offsetHeight + preload),
            isVisibleX = element.offsetLeft >= 0 && element.offsetLeft < window.innerWidth - 200;

        return isVisibleY && isVisibleX;
    }

} module.exports = LazyLoadHandler;
