

/* ---- Higher hook controller ---- */
class HookController {

  // Constructor
  constructor() { this.hooks = { }; }

  // Add
  on( action, cb ) {

    // Checks & adds callback to hooks
    if(this.hooks[action] == null){this.hooks[action] = [];}
    this.hooks[action].push(cb);

  }

  // Remove
  off( action, cb ) {

    // Checks
    if(this.hooks[action]==null){return;}

    // Removes hook
    for ( let n = 0; n < this.hooks[action].length; n++ ) {
      if ( this.hooks[action][n] === cb ) {
        this.hooks.splice(n,1);
      }
    }

  }

  // Dispatch
  trigger( action, payload ) {

    // Checks
    if(this.hooks[action]==null){return;}

    // Dispatches hook
    for ( let n = 0; n < this.hooks[action].length; n++ ) {
      this.hooks[action][n](payload);
    }

  }

}


/* ---- Exports ---- */
export default HookController;
