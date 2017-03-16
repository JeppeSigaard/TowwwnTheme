

// Slider
const ts = require( './towwwnSelector.js' ).default,
      tselem = require( './towwwnSelector.js' ).tselem;

tselem.prototype.initSlider = function( params ) {
    return new Promise(( resolve, reject ) => {
        let prevButton = typeof params.prevButton === 'string' ? params.prevButton : null,
            nextButton = typeof params.nextButton === 'string' ? params.nextButton : null,
            inner = typeof params.inner === 'string' ? params.inner : null;
        
        this.foreach(( elem ) => {
            
            // Fields
            let prevButtonElem = ts( prevButton, elem ),
                nextButtonElem = ts( nextButton, elem ),
                innerElem = ts( inner, elem ),
                slides = innerElem.children(),
                currentIndex = 0;
    
            // Event Handlers
            prevButtonElem.foreach( ( elem ) => { elem.on( 'click', ( e ) => { innerElem.changeSlide( currentIndex-1 ) }); } );
            nextButtonElem.foreach( ( elem ) => { elem.on( 'click', ( e ) => { innerElem.changeSlide( currentIndex+1 ) }); } );
            
            // Change slide
            innerElem.__proto__.changeSlide = function( index ) {
                
                // Wrap around
                console.log( slides );
                if ( index < 0 ) index = slides.length-1;
                if ( index > slides.length-1 ) index = 0;
                
                // Changes slide
                this.currentIndex = index;
                innerElem.css({ 'left' : slides.get(index).position().left });
                
            }.bind(this);
            
        });
    });
};

module.exports = ts;