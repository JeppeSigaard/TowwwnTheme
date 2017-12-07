

// Sync Scroll
const TowwwnApp = require( '../../app/pages/TowwwnApp.js' ),
      _ = require( './underscore.js' );
class SyncScrollHandler {

    // Ctor
    constructor() {

        // Sets fields
        this.canFixedScroll = true;
        this.canPosition = true;
        this.container = null;
        this.containerHeight = 0;
        this.elem = null;
        this.inner = null;
        this.highestElem = null;
        this.lastScrollTop = 0;
        this.ready = false;
        this.is_at = 'top',

        // Runs internal functions
        this.wrapElems();
        this.rescaleContainer();
        this.bindEventListeners();

    }

    // Add Event Listeners
    bindEventListeners() {

        // Activates internal scroll function
        window.addEventListener( 'scroll', this.onscroll.bind(this) );

        // Activates internal resize function
        window.onresize = function() {
            this.rescaleContainer( this.focusedViews != null ? this.focusedViews : null );
        }.bind(this);

        // Sets class to ready state
        this.ready = true;

    }

    // Wraps elems
    wrapElems() {
        this.container = document.getElementById( 'page-content' );
        this.elem = document.getElementsByClassName( 'sync-outer' );
        this.inner = document.getElementsByClassName( 'sync-inner' );
    }

    // Checks if an elem is in view
    isInView( element ) {
        return element.offsetLeft >= 0 && element.offsetLeft < window.innerWidth - 200;
    }

    // Rescales the container
    rescaleContainer( fv ) {
        if ( _('body').hasClass('mobile') ) return;

        let focusedViews = null,
            oldHeight = window.innerHeight;

        if ( fv != null ) {
            this.focusedViews = fv;
            focusedViews = fv;
        } else focusedViews = this.focusedViews;

        return new Promise((resolve, reject) => {
            if ( this.container !== null ) {

                let high = document.getElementsByClassName('high');
                for( let item in high ) {
                    if (high.hasOwnProperty(item)){
                        high[item].classList.remove('high');
                    }
                }

                this.containerHeight = 0; let highestElem = null;

                if ( focusedViews != null ) {

                    for ( let view of focusedViews ) {
                        for ( let outer of view.childNodes ) {
                            if ( outer.classList.contains('sync-outer') ) {
                                for ( let inner of outer.childNodes ) {
                                    if ( inner.classList.contains( 'sync-inner' ) ) {
                                        if ( inner.clientHeight > this.containerHeight && this.isInView( inner ) ) {
                                            this.containerHeight = inner.clientHeight;
                                            highestElem = inner;
                                        } break;
                                    }
                                } break;
                            }
                        }
                    }
                } else {
                    let syncInners = document.getElementsByClassName('sync-inner');
                    for ( let item of syncInners ) {
                        if ( item.clientHeight > this.containerHeight && this.isInView( item ) ) {
                            this.containerHeight = item.clientHeight;
                            highestElem = item;
                        }
                    }
                }

                this.container.style.height = this.containerHeight + 'px';

                if ( highestElem.parentNode.classList.contains('sync-outer') ) {
                    highestElem.parentNode.classList.remove( 'fixed' );
                    highestElem.parentNode.classList.remove( 'absolute' );
                    highestElem.parentNode.classList.remove( 'top' );
                    highestElem.parentNode.classList.add( 'high' );
                }

            } resolve ();
        });
    }

    // Scroll Event Handler
    onscroll() {
        if ( _('body').hasClass('mobile') ) return;

        if ( this.container == null || this.elem == null ) return;
        // Fields
        let containerTop = this.container.offsetTop,
            containerHeight = this.container.clientHeight,
            winScrollTop = window.pageYOffset,
            winHeight = window.innerHeight,
            delta = winScrollTop - this.lastScrollTop;

        // Check if above sync scroll area
        if ( winScrollTop  < containerTop - 60) {

            if(this.is_at !== 'top'){
                for ( let item in this.elem ) {
                    if(this.elem.hasOwnProperty(item)){
                        if ( !this.elem[item].classList.contains( 'high' ) ) {
                            this.elem[item].scrollTop = 0;
                        }
                    }
                }

                this.is_at = 'top';
            }
        }

        // Checks if below sync scroll area
        else if ( winScrollTop + winHeight > containerTop + containerHeight ) {
            if(this.is_at !== 'bottom'){
                for ( let item in this.elem ) {
                    if(this.elem.hasOwnProperty(item)){
                        if ( !this.elem[item].classList.contains( 'high' ) ) {
                            this.elem[item].scrollTop = 500000;
                        }
                    }
                }
                this.is_at = 'bottom';
            }

        }

        // In sync scroll area
        else {
            if(this.is_at !== 'middle'){this.is_at = 'middle';}

            for ( let item in this.elem ) {
                if(this.elem.hasOwnProperty(item)){
                    if ( !this.elem[item].classList.contains( 'high' ) ) {
                        this.elem[item].scrollTop = this.elem[item].scrollTop + delta;
                    }
                }
            }
        }

        this.lastScrollTop = winScrollTop;
    }

} module.exports = SyncScrollHandler;









