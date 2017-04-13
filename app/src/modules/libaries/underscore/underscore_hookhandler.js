

// Hook Handler
class HookHandler {

    /* ---- Constructor ---- */
    constructor( parent ) {
        this.parentName = parent.constructor.name;
        this.hooks = { };
    }

    /* ---- Add hook ---- */
    add( event, func ) {
        if ( this.hooks[event] == null )
            this.hooks[event] = [ func ];
        else this.hooks[event].push( func );
    }

    /* ---- Trigger ---- */
    trigger( event, auth, data ) {
        if ( auth.constructor.name !== this.parentName ) return;
        if ( this.hooks[event] != null ) {
            for ( let func of this.hooks[event] ) {
                func( data );
            }
        }
    }

} module.exports = HookHandler;
