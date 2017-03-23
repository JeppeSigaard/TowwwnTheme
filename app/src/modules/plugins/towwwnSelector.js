

// Towwwn Selector
let TowwwnSelector = ( selector ) => {
    if ( selector == null ) return TSElem;
    let elem = new TSElem();
    console.log( document.querySelectorAll(selector) );
    elem.state = {
        domnode : document.querySelectorAll( selector ),
    }; return elem;
}; module.exports = TowwwnSelector;

// Towwwwn Selector Elem
class TSElem {
    
    // Check state
    checkState() {
        if ( this.state == null )
            return false;
        return true;
    }
    
    // Get
    get( index ) {
        if ( index != null &&
             typeof this.state.domnode === 'object' ) {
            return this.state.domnode[ index ];
        } else return this.state.domnode;
    }
    
    // Add Class
    addClass( className ) {
        if ( this.state.domnode != null ) {
            if ( typeof this.state.domnode === 'object' ) {
                for ( let node of this.state.domnode )
                    node.classList.add( className );
            } else this.state.domnode.classList.add( className );
        } return;
    }
    
    // Remove class
    removeClass( className ) {
        if ( this.state.domnode != null ) {
            if ( typeof this.state.domnode === 'object' ) {
                for ( let node of this.state.domnode )
                    node.classList.remove( className );
            } else this.state.domnode.classList.remove( className );
        } return;
    }

    // Has class
    hasClass( className ) {
        if ( typeof this.state.domnode === 'object' ) {
            for ( let elem of this.state.domnode ) {
                if ( !elem.classList.contains( className ) )
                    return false;
            } return true;
        } return this.state.domnode.contains( className );
    }

    // On
    on( event, func ) {
        if ( typeof event !== 'string' || typeof func !== 'function' ) return;
        if ( typeof this.state.domnode === 'object' ) {
            for ( let elem of this.state.domnode )
                elem.addEventListener( event, func );
        } else this.state.domnode.addEventListener( event, func );
    }

    // On global click; NOT WORKING
    static onGlobalClick( selector, func ) {
        document.addEventListener( 'click', e => {
            let nodes = document.querySelectorAll( selector );
            if ( typeof nodes === 'object' ) {
                for ( let item of nodes ) {
                    let x = item.offsetLeft,
                        y = item.offsetTop,
                        w = item.clientWidth,
                        h = item.clientHeight;

                    if ( e.clientX >= x &&
                         e.clientX <= x + w &&
                         e.clientY >= y &&
                         e.clientY <= y + h ) {
                        func( e );
                    }
                }
            }
        });
    }

    // Children
    children() {
        if ( this.state.domnode != null ) {
            let elem = new TSElem();
            elem.state = { domnode: [] };
            if ( typeof this.state.domnode === 'object' ) {
                for ( let node of this.state.domnode ) {
                    for ( let child of node.childNodes ) {
                        elem.state.domnode.push( child );
                    }
                }
            } else {
                for ( let child of this.state.domnode.childNodes )
                    elem.state.domnode.push( child );
            } return elem;
        } return;
    }

    // Individual Children
    individualChildren() {
        if ( this.state.domnode != null ) {
            let elems = [];
            if ( typeof this.state.domnode === 'object' ) {
                for ( let node of this.state.domnode ) {
                    for ( let child of node.childNodes ) {
                        let elem = new TSElem();
                        elem.state = {
                            domnode: child,
                        }; elems.push( elem );
                    }
                }
            } else {
                for ( let child of this.state.domnode.childNodes ) {
                    let elem = new TSElem();
                    elem.state = {
                        domnode: child,
                    }; elems.push( elem );
                }
            } return elems;
        } return;
    }

    // Parent
    parent() {
        let elem = new TSElem();
        if ( typeof this.state.domnode === 'object' ) {
            elem.state = { domnode: this.state.domnode[0].parentNode };
        } else elem.state = { domnode: this.state.domnode.parentNode };
        return elem;
    }

    // Css
    css() {
    }
    
    // ComputedStyle
    style() {
        let resp = [];
        if ( typeof this.state.domnode === 'object' ) {
            for ( let node of this.state.domnodes )
                resp.push( window.getComputedStyle( node ) );
        } else { resp.push( window.getComputedStyle( this.state.domnode ) ); }
        return resp;
    }

    // Position
    position() {
        let top = this.offset().top - this.parent().offset().top;
        let left = this.offset().left - this.parent().offset().left;
        return { top: top, left: left };
    }
    
    // Offset
    offset() {
        let node = this.state.domNode[0];
        if ( typeof this.state.domNode !== 'object' ) node = this.state.domNode;
        return { top  : node.offsetTop, left : node.offsetLeft };
    }

}
