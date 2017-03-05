

// Image Handler
class ImageHandler {

    // Ctor
    constructor() {
        window.addEventListener( 'scroll', this.lazyLoad.bind(this) );
    }

    // Is in view
    isInView( elem ) {
        var docViewTop = window.pageYOffset;
        var docViewBottom = docViewTop + window.innerHeight;

        var elemTop = elem.offsetTop;
        var elemBottom = elemTop + elem.clientHeight;

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
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
