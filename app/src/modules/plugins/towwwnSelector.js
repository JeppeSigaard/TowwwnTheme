

// Towwwn Selector
function TowwwnSelector( selector, elem ) {
    if ( elem != null ) return elem.find( selector );
    return new tselem( selector );
}

class tselem {
    
    // Ctor
    constructor( selector ) { 
        this.domElem = document.querySelectorAll( selector ); 
        this.selector = selector; 
    }
    
    // One liners
    get() { return this.domElem; }
    find( selector ) { return new tselem( this.selector+' '+selector ); }
    
    // Foreach
    foreach( func ) {
        if ( typeof this.domElem === 'object' ) {
            for ( let elem of this.domElem ) { func( elem ); }
        } else func( elem );
    }
    
    // Add Class
    addClass( className ) {
        try {
            if ( typeof this.domElem === 'object' ) {
                for ( let elem of this.domElem ) {
                    elem.classList.add( className ); }
            } else elem.classList.add( className );
        } catch ( error ) { throw 'Unsupported elem type: ' + typeof this.domElem; }
    }
    
    // Remove Class
    removeClass( className ) {
        try {
            if ( typeof this.domElem === 'object' ) {
                for ( let elem of this.domElem ) {
                    elem.classList.remove( className ); }
            } else elem.classList.remove( className );
        } catch ( error ) { throw 'Unsupported elem type: ' + typeof this.domElem; }
    }
    
    // Style
    css ( styling ) {
        if ( typeof styling === 'object' ) {
            
            // Class Elems
            if ( typeof this.domElem === 'object' ) {
                for ( let elem of this.domElem ) {
                    for ( let styleKey in styling ) {
                        elem.style[ styleKey ] = styling[ styling ]; }}
            
            // Id elems
            } else {
                for ( let styleKey in styling ) {
                    this.domElem[ styleKey ] = styling[ styleKey ];
                }
            }
            
        } else throw 'Unsupported styling param type: ' + typeof styling;
    }
    
} module.exports = { default: TowwwnSelector, tselem: tselem };