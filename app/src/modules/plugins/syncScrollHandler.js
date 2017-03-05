

// Sync Scroll
const TowwwnApp = require( '../../app/pages/TowwwnApp.js' );
class SyncScrollHandler {

    // Ctor
    constructor( parentSelector, elementSelector ) {

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

        // Runs internal functions
        this.wrapElems( parentSelector, elementSelector );
        this.rescaleContainer();
        this.bindEventListeners();

    }

    // Add Event Listeners
    bindEventListeners() {

        // Activates internal scroll function
        window.onscroll = this.onscroll.bind(this);

        // Activates internal resize function
        window.onresize = function() {
            if ( this.settings.canFixedScroll ) {
                this.rescaleContainer();
                this.setHorizontalPosition();
            }
        };

        // Sets class to ready state
        this.ready = true;

    }

    // Wraps elems
    wrapElems( parentSelector, elementSelector ) {
        this.container = parentSelector;
        this.elem = document.getElementsByClassName( 'sync-outer' );
        this.inner = document.getElementsByClassName( 'sync-inner' );
    }

    // Sets the horizontal position of elem
    setHorizontalPosition( element ) {

        // Checks if elem is set, and uses it if it is
        if ( typeof element === 'object' &&
             element.classList.contains( 'fixed' ) ) {
            for( let item of element ) {
                item.style.left = item.parentNode.offsetLeft + 'px';
                item.style.width = item.parentNode.clientWidth + 'px';
            } return;
        } else if ( typeof element !== 'undefined' &&
                    element.classList.container( 'fixed' ) ) {
            element.style.left = element.parentNode.offsetTop + 'px';
            element.style.width = element.parentNode.clientWidth + 'px';
            return;
        } else if ( typeof element !== 'undefined' ) {
            element.removeAttribute('style');
            return;
        }

        // Else use the preset element
        for( let item of this.elem ) {
            if ( item.classList.contains( 'fixed' ) ) {
                item.style.left = item.parentNode.offsetLeft + 'px';
                item.style.width = item.parentNode.clientWidth + 'px';
            } else item.removeAttribute( 'style' );
        }

    }

    // Checks if an elem is in view
    isInView( element ) {
        return element.offsetLeft >= 0 && element.offsetLeft < window.innerWidth - 200;
    }

    // Rescales the container
    rescaleContainer() {
        return new Promise((resolve, reject) => {
            if ( this.container !== null ) {

                let high = document.getElementsByClassName('high'),
                    highHeight = high.length ? high[0].clientHeigth : 0;

                for( let item of high ) { item.classList.remove('high') }
                this.containerHeight = 0; let highestElem = null;

                let syncInners = document.getElementsByClassName('sync-inner');
                for ( var item of syncInners ) {
                    console.log( item );

                    if ( item.clientHeight > this.containerHeight && this.isInView( item ) ) {
                        this.containerHeight = item.clientHeight;
                        highestElem = item;
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

        let forceRepaint = false;

        // Fields
        let ct = this.container.offsetTop,
            ch = this.container.clientHeigth,
            st = window.pageYOffset,
            wh = window.height,
            delta = st - this.lastScrollTop;

        // Run if sync scroll is ready and a new cycle is allowed
        if ( this.ready && this.canPosition && this.canFixedScroll ) {

            // Dissallows new cycle ( Until completion )
            this.canPosition = false;

            // Check if above sync scroll area
            if ( st + 60 < ct ) {
                for ( var item of this.elem ) {
                    if ( item.classList.contains( 'high' ) ) {
                        item.classList.remove( 'fixed' );
                        item.classList.remove( 'top' );
                        item.classList.remove( 'bottom' );
                    } else if ( !item.classList.contains( 'top' ) ) {
                        item.classList.add( 'top' );
                        item.classList.remove( 'bottom' );
                        item.classList.remove( 'fixed' );
                        item.removeAttribute( 'style' );
                    }
                }

                forceRepaint = true;
            }

            // Checks if below sync scroll area
            else if ( st + wh > ct + ch ) {
                for ( let item of this.elem ) {

                    // Cleans high
                    if ( item.classList.contains( 'high' ) ) {
                        item.classList.remove( 'fixed' );
                        item.classList.remove( 'top' );
                        item.classList.remove( 'bottom' );
                    }

                    // Or sets it to the bottom and forces repaint
                    else if ( !item.classList.contains('bottom') ) {
                        item.classList.add( 'bottom' );
                        item.classList.remove( 'top' );
                        item.classList.remove( 'fixed' );
                        item.removeAtrribute( 'style' );
                        forceRepaint = true;
                    }

                }
            }

            // In sync scroll area
            else {
                for ( let item of this.elem ) {
                    let syncinner = false;

                    // Sets the sync inner field
                    for ( let child of item.childNodes ) {
                        if ( child.classList.contains('sync-inner') ) syncinner = child; }

                    // Cleans the highs sync
                    if ( item.classList.contains( 'high' ) ) {
                        item.classList.remove( 'fixed' );
                        item.classList.remove( 'top' );
                        item.classList.remove( 'bottom' );
                    }

                    // Coming from top; add fixed and set the internal scroll
                    else if ( item.classList.contains( 'top' ) ) {
                        if ( syncinner.offsetTop <= st + wh ) {
                            item.classList.add( 'fixed' );
                            item.classList.remove( 'top' );
                            item.classList.remove( 'bottom' );
                            item.scrollTop = syncinner.offsetTop;
                            forceRepaint = true;
                        }
                    }

                    // Coming from bottom; go fixed and sync scroll top on inner
                    else if ( item.classList.contains( 'bottom' ) && syncinner.offsetTop >= st ) {
                        item.classList.add( 'fixed' );
                        item.classList.remove( 'top' );
                        item.classList.remove( 'bottom' );
                        item.scrollTop = 60;
                        forceRepaint = true;
                    }

                    if ( item.classList.contains( 'fixed' ) ) {
                        item.scrollTop = item.scrollTop + delta;
                        this.setHorizontalPosition( item );
                    }

                }
            }

            if ( forceRepaint ) {
                this.container.style.transform = 'translateZ(1)';
                this.container.style.transform = 'none';
            }

        }

        this.lastScrollTop = st;
        this.canPosition = true;

    }

    // Locks view and removes scroll capabilities
    lockView() {

        this.canFixedScroll = false;
        let body = document.getElementsByTagName('body')[0];
        body.classList.add( 'no-scroll' );
        body.style.height = '100%';
        body.style.overflow = 'hidden;'

        if ( this.container !== null ) {
            this.container.style.height = window.height - this.container.offsetTop + 'px';
            this.container.style.overflow = 'hidden';
        }

        let syncOuters = document.getElementsByClassName('sync-outer');
        for ( let item of syncOuters ) {
            item.removeAttribute('style');
            item.style.position = 'absolute';
            item.style.width = '100%';
            item.style.top = item.offsetTop - item.parentNode.offsetTop;
            item.style.left = '0';
        };

    }

    // Releases view again
    releaseView() {

        this.canFixedScroll = true;
        let syncOuters = document.getElementsByClassName('sync-outer');
        for ( let item of syncOuters ) {
            item.removeAttribute( 'style' ); }

        let body = document.getElementsByTagName('body')[0];
        body.classList.remove( 'no-scroll' );
        body.removeAttribute( 'style' );

        this.setHorizontalPosition();
        this.onscroll();
        this.rescaleContainer().then((resp) => {
            let goTopSide = false;
            if ( window.width <= 640 ) goTopSide = true;
            for ( let item of this.elem ) {
                // Add logic to change scroll to bookmark mode elem her
                if ( this.isInView( item ) && !item.classList.contains('high') ) goTopSide = false;
            }

            if ( goTopSide ) window.scrollTop = this.container.offsetTop - 60;
        });

    }

} module.exports = SyncScrollHandler;









