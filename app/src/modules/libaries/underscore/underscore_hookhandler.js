

// Hook Handler
class HookHandler {

    /* ---- Constructor ---- */
    constructor() {
        this.hooks = { };
    }

    /* ---- Add hook ---- */
    add( event, func ) {
        if ( this.hooks[event] == null )
            this.hooks[event] = [ func ];
        else this.hooks[event].push( func );
    }

    /* ---- Trigger ---- */
    trigger( event, data ) {
        if ( this.hooks[event] != null ) {
            for ( let func of this.hooks[event] ) {
                func( data );
            }
        }
    }

} module.exports = HookHandler;
