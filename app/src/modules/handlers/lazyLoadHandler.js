


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
            if ( this.isInView( elem ) ) {
                let uElem = _( elem ),
                    request = new XMLHttpRequest();

                request.onload = (( response ) => {
                    uElem.css({ 'background-image' : 'url('+ response.target.responseURL +')' });
                    uElem.removeAttr( 'data-image-src' );
                });

                request.open( 'GET', uElem.attr('data-image-src') );
                request.send();
            }
        }

    }

    // In view
    isInView(element) {
        let elemTop = element.getBoundingClientRect().top,
            elemBottom = element.getBoundingClientRect().bottom,
            isVisibleY = (elemTop >= 0) && (elemBottom <= window.innerHeight),
            isVisibleX = element.offsetLeft >= 0 && element.offsetLeft < window.innerWidth - 200;

        return isVisibleY && isVisibleX;
    }

} module.exports = LazyLoadHandler;
