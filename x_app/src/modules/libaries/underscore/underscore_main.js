
require( './underscore_cookie_lib.js' );
(() => { window._ = UnderScore; })();

// Towwwn Selector
let UnderScore = ( selector ) => {
    if ( selector == null ) return UnderScoreElem;

    // Creates new elem
    let elem = new UnderScoreElem();

    // Checks if selector is a node
    if ( ( selector.constructor.name != null &&
         selector.constructor.name === 'NodeList' ) ||
         typeof selector === 'object' )
        elem.state = { domnode: selector };

    // Gets dom node(s)
    if ( elem.state == null ) {
        if ( selector === document ) elem.state = { domnode : document, };
        else if ( selector === window ) elem.state = { domnode : window, };
        else {
            let domnode = document.querySelectorAll( selector );
            if ( domnode.constructor.name === 'NodeList' ) elem.state = { domnode : domnode };
            else elem.state = { domnode: [ domnode ] };
        }
    }

    // Checks if any elems where found
    if ( elem.state.domnode.length != null && elem.state.domnode.length <= 0 &&
         elem.state.domnode !== window && elem.state.domnode !== document ) {
        // throw "TowwwnSelector: No elements were found with selector: " + selector;
        return false;
    }

    // Returns elem
    return elem;

}; module.exports = UnderScore;

// Towwwwn Selector Elem
class UnderScoreElem {

    // Get
    get( index ) {
        if ( index != null &&
             typeof this.state.domnode === 'object' ) {
            if ( this.state.domnode.constructor.name !== 'HTMLElement' ) {
                return this.state.domnode[ index ];
            } else return this.state.domnode;
        } else return this.state.domnode;
    }

    // Add Class
    addClass( className ) {
        if ( this.state.domnode.constructor.name === 'HTMLElement' )
            this.state.domnode = [ this.state.domnode ];

        if ( className.includes(' ') ) {
            className = className.split(' ');
            for ( let item of className ) {
                for ( let node of this.state.domnode ) {
                    node.classList.add( item );
                }
            }
        } else {
            if ( this.state.domnode != null ) {
                for ( let node of this.state.domnode )
                    node.classList.add( className );
            }
        } return this;
    }

    // Remove class
    removeClass( className ) {
        if ( this.state.domnode.constructor.name === 'HTMLElement' )
            this.state.domnode = [ this.state.domnode ];

        if ( className.includes(' ') ) {
            className = className.split(' ');
            for ( let item of className ) {
                for ( let node of this.state.domnode ) {
                    node.classList.remove( item );
                }
            }
        } else {
            if ( this.state.domnode != null ) {
                for ( let node of this.state.domnode )
                    node.classList.remove( className );
            }
        } return this;
    }

    // Has class
    hasClass( className ) {
        if ( typeof this.state.domnode === 'object' ) {
            for ( let elem of this.state.domnode ) {
                if ( !elem.classList.contains( className ) )
                    return false;
            } return true;
        }
    }

    // On
    on( event, func ) {

        if ( typeof event !== 'string' || typeof func !== 'function' ) return;
        if ( this.state.domnode === window ||
             this.state.domnode === document ) {
            this.state.domnode.addEventListener( event, func );
            return;
        }

        if ( Array.isArray( this.state.domnode ) ||
             ( this.state.domnode.constructor.name != null &&
               this.state.domnode.constructor.name === 'NodeList' )) {
            for ( let elem of this.state.domnode ) {
                elem.addEventListener( event, func ); }
        }

        return this;
    }

    // Off
    off( event, func ) {
        if ( typeof event !== 'string' || typeof func !== 'function' ) return;
        if ( this.state.domnode === window ||
             this.state.domnode === document ) {
            this.state.domnode.removeEventListener( event, func );
            return;
        }

        if ( Array.isArray( this.state.domnode ) ||
             ( this.state.domnode.constructor.name != null &&
               this.state.domnode.constructor.name === 'NodeList' )) {
            for ( let elem of this.state.domnode ) {
                elem.removeEventListener( event, func ); }
        }

        return this;
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
    css( styling ) {
        if ( typeof styling === 'object' ) {
            for ( let key of Object.keys( styling ) ) {
                if ( this.state.domnode.constructor.name === 'HTMLElement' ||
                     this.state.domnode.constructor.name === 'HTMLDivElement' ) {
                    this.state.domnode = [ this.state.domnode ];
                }

                for ( let iter = 0; iter < this.state.domnode.length; iter++ ) {
                    this.state.domnode[ iter ].style[ key ] = styling[ key ];
                }
            } return this;
        } else {
            throw "TowwwnSelector, css: Param needs to be of type object";
            return this;
        }
    }

    // ComputedStyle
    style() {
        if ( this.state.domnode.constructor.name === 'HTMLElement' ||
             this.state.domnode.constructor.name === 'HTMLDivElement' ) {
            this.state.domnode = [ this.state.domnode ];
        }

        let resp = [];
        for ( let node of this.state.domnode ) {
            resp.push( window.getComputedStyle( node ) );
        } return resp;
    }

    // Html
    text( data ) {
        for ( let item of this.state.domnode ) { item.textContent = data; }
    }

    // Position
    position() {
        let top = this.offset().top - this.parent().offset().top;
        let left = this.offset().left - this.parent().offset().left;
        return { top: top, left: left };
    }

    // Offset
    offset() {
        let node = this.state.domnode[0];
        return { top : node.offsetTop, left : node.offsetLeft };
    }

    // Width
    width() {
        let node = this.state.domnode;
        if ( node.constructor.name === 'NodeList' ) node = node[0];
        return node.innerWidth || node.clientWidth;
    }

    // Height
    height() {
        let node = this.state.domnode;
        if ( node.constructor.name === 'NodeList' ) node = node[0];
        return node.innerHeight || node.clientHeight;
    }

    // Attribute
    attr( attr ) {
        window.domnode = this.state.domnode;
        if ( this.state.domnode.constructor.name === 'HTMLElement' ||
             this.state.domnode.constructor.name === 'HTMLAnchorElement' ||
             this.state.domnode.constructor.name === 'HTMLDivElement' ) {
            this.state.domnode = [ this.state.domnode ];
        } return this.state.domnode[0].getAttribute(attr);
    }

    // Has Attribute
    hasAttr( attr ) {
        if ( this.state.domnode.constructor.name === 'HTMLElement' ||
             this.state.domnode.constructor.name === 'HTMLAnchorElement' ||
             this.state.domnode.constructor.name === 'HTMLDivElement' ) {
            this.state.domnode = [ this.state.domnode ];
        } return this.state.domnode[0].getAttribute( attr ) != null ? true : false;
    }

    // Remove Attribute
    removeAttr( attr ) {
        if ( this.state.domnode.constructor.name === 'HTMLElement' ||
             this.state.domnode.constructor.name === 'HTMLAnchorElement' ||
             this.state.domnode.constructor.name === 'HTMLDivElement' ) {
            this.state.domnode = [ this.state.domnode ];
        }

        for ( let item of this.state.domnode ) {
            item.removeAttribute( attr );
        } return this;
    }

}









