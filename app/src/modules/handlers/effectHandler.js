

// Effect Handler, singleton
let efh = null;
const _ = require( '../libaries/underscore/underscore_main.js' );
class EffectHandler {

    /* ---- Constructor ---- */
    constructor() {
        if ( efh != null ) return efh;
        else efh = this;
        this.buttonBounce(
            _('.login-btn'),
            350, 4000, true
        );
    }

    /* ---- CTA Button Bounce ---- */
    buttonBounce( elem, tt, to, cont ) {
        to = to == null ? 0 : to;
        tt = tt == null ? 0 : tt;
        setTimeout(() => {
            elem.addClass('bounce');
            setTimeout(() => {
                elem.removeClass('bounce');
                if ( cont ) this.buttonBounce( elem, tt, to, cont );
            }, tt);
        }, to);
    }

}

(() => { efh = new EffectHandler(); })();
module.exports = efh;
