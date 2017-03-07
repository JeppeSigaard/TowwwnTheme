

// Image Handler
class ImageHandler {

    // Ctor
    constructor() {
        window.addEventListener( 'scroll', this.lazyLoad.bind(this) );
    }

    // Checks if an elem is in view
    isInView( element ) {
        return element.offsetLeft >= 0 && element.offsetLeft < window.innerWidth - 200;
    }

    // Lazy load
    lazyLoad() {
        var items = document.querySelectorAll('[data-image-src]');
        for ( let item of items ) {
            if ( this.isInView( item ) && !item.classList.contains('loading') && !item.classList.contains('imgloaded') ) {
                let imgSrc = item.getAttribute( 'data-image-src' );
                item.classList.add('loading');
                item.style['background-image'] = 'url(style/assets/icons/loading.svg)';

                var request = new XMLHttpRequest();
                request.onload = function() {
                    item.style['background-image'] = 'url('+imgSrc+')';
                    item.removeAttribute( 'data-image-src' );
                    item.classList.remove( 'loading' );
                    item.classList.add('imgloaded');
                }.bind(this);

                request.open( 'GET', imgSrc );
                request.send();
            }
        }
    }

} module.exports = ImageHandler;
