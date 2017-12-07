


// Underscore array
const HookHandler = require( './underscore_hookhandler.js' );
class UnderscoreArray {

    // Constructor
    constructor( array ) {
        if ( array.constructor.name !== 'Array' ) return null;
        this.hooks = new HookHandler();
        this.data = array;
    }

    // Push
    push( elem ) {
        this.data.push( elem );
        this.hooks.trigger( 'onpush' );
    }

} module.exports = UnderscoreArray;
