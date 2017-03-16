

// Slider
const ts = require( './towwwnSelector.js' ).default,
      tselem = require( './towwwnSelector.js' ).tselem;

tselem.prototype.initSlider = function( params ) {
    return new Promise(( resolve, reject ) => {
        let prevButton = typeof params.prevButton === 'string' ? params.prevButton : null,
            nextButton = typeof params.nextButton === 'string' ? params.nextButton : null,
            inner = params.inner != null ? params.inner : null;
        
        this.foreach(( elem ) => {
            
            // Fields
            let prevButtonElem = ts( prevButton, elem ),
                nextButtonElem = ts( nextButton, elem ),
                inner = ts( inner, elem );
    
            // Event Handlers
            console.log( prevButtonElem.get(), nextButton.get() );
            
        });
    });
};

module.exports = ts;