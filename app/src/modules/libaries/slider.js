

// Slider
//const ts = require( './towwwnSelector.js' ).default,
//      tselem = require( './towwwnSelector.js' ).tselem;

class TowwwnSlider {

    // Constructor
    constructor( ) {
    }

    // Init slider
    initSlider( params ) {
        return new Promise(( resolve, reject ) => {
            let outerElem = typeof params.outer === 'string' ? document.querySelectorAll( params.outer ) : null,
                prevButton = typeof params.prevButtonClass === 'string' ? params.prevButtonClass : null,
                nextButton = typeof params.nextButtonClass === 'string' ? params.nextButtonClass : null,
                inner = typeof params.innerClass === 'string' ? params.innerClass : null;

            // AssignmentLoop
            let assignmentLoop = ( elem => {

                // Fields
                let prevButtonElem = [], nextButtonElem = [],
                    innerElem = [], slides = [],
                    currentIndex = 0;

                // Get items
                for ( let child of elem.childNodes ) {
                    if ( child.classList.contains( prevButton ) ) prevButtonElem.push( child );
                    if ( child.classList.contains( nextButton ) ) nextButtonElem.push( child );
                    if ( child.classList.contains( inner ) ) innerElem.push( child );
                }

                // Sets elems
                prevButtonElem = prevButtonElem[0];
                nextButtonElem = nextButtonElem[0];
                innerElem = innerElem[0];
                slides = innerElem.childNodes;

                if ( this.ready ) resolve();

                elem.classList.add( 'towwwnslider-outer' );
                innerElem.classList.add( 'towwwnslider-inner' );

                // Event Handlers
                if ( !prevButtonElem.classList.contains( 'towwwnslider-button' ) ) {
                    prevButtonElem.addEventListener( 'click', e => {
                            innerElem.changeSlide( currentIndex-1 ); });
                    prevButtonElem.classList.add( 'towwwnslider-button' );
                }

                if ( !nextButtonElem.classList.contains( 'towwwnslider-button' ) ) {
                    nextButtonElem.addEventListener( 'click', e => {
                            innerElem.changeSlide( currentIndex+1 ); });
                    nextButtonElem.classList.add( 'towwwnslider-button' );
                }

                // Change slide
                innerElem.__proto__.changeSlide = function( index ) {

                    // Wrap around
                    if ( index < 0 ) index = slides.length-1;
                    if ( index > slides.length-1 ) index = 0;
                    currentIndex = index;

                    // Sets fields
                    let computedStyle = window.getComputedStyle( slides[index] ),
                        marginLeft = parseInt( computedStyle.marginLeft.split('px').join('') );

                    // Changes slide
                    innerElem.style.left = -( slides[ index ].offsetLeft - marginLeft ) + 'px';

                };

            });

            // Runs assignment loop
            if ( typeof outerElem === 'object' ) {
                for ( let outer of outerElem ) assignmentLoop( outer );
            } else assignmentLoop( outerElem );

            this.ready = true;
            resolve ();

        });
    }

} module.exports = TowwwnSlider;
