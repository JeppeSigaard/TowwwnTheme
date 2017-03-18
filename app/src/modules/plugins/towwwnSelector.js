

// Towwwn Selector
function TowwwnSelector( selector, elems ) {
    if ( selector != null && elems == null ) {
        let elem = new tselem();
        elem.domElem = document.querySelectorAll( selector );
        elem.selector = selector;

        if ( typeof elem.domElem !== 'object' ) elem.domElem = [ elem.domElem ];
        return elem;
    }
    
    if ( selector == null && elems != null ) {
        let elem = new tselem();
        if ( typeof elems === 'object' ) elem.domElem = elems;
        else elem.domElem = elems.domElem;
        
        if ( typeof elem.domElem !== 'object' ) elem.domElem = [ elem.domElem ];
        return elem;
    }

    if ( selector != null && elems != null ) {
        // Do stuff
    }
}

class tselem {
    
    // One liners
    get( index ) { return new tselem( this.selector, new tselem( null, this.domElem[index] ) ); }
    find( selector ) { return new tselem( this.selector+' '+selector ); }
    children() { return new tselem( null, this.domElem.childNodes ); }
    
    // Foreach
    foreach( func ) {
        console.log( this.domElem );
        if ( typeof this.domElem === 'object' ) {
            for ( let elem of this.domElem ) { func( new tselem( this.selector, elem ) ); }
        } else func( new tselem( this.selector, this.domElem ) );
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

    // Event
    on( event, func ) {
        console.log( this );
        if ( typeof this.domElem === 'object' ) {
            for ( let elem of this.domElem ) {
                elem.addEventListener( event, func ); }
        } else {
            this.domElem.addEventListener( event, func );
        }
    } 

    // Style
    css ( styling ) {
        if ( typeof styling === 'object' ) {
            if ( typeof this.domElem === 'object' ) {
                for ( let elem of this.domElem ) {
                    for ( let styleKey in styling ) {
                        elem.style[ styleKey ] = styling[ styling ]; 
                    }
                }
            } else {
                for ( let styleKey in styling ) {
                    this.domElem[ styleKey ] = styling[ styleKey ];
                }
            } return;
        } else if ( typeof styling === 'string' ) {
            if ( typeof this.domElem === 'object' ) return this.domElem[0].style[styling];
            else return this.domElem.style[styling];
        } throw 'Unsupported styling param type: ' + typeof styling;
    }
    
    // Position
    position() {
        let elem = null;
        if ( typeof this.domElem === 'object' ) elem = this.domElem[0];
        else elem = this.domElem;
        
        let resp = {
            left: elem.offsetLeft - elem.parentNode.offsetLeft,
            top: elem.offsetTop - elem.parentNode.offsetTop,
        }; return resp;
    }
    
} module.exports = { default: TowwwnSelector, tselem: tselem };






