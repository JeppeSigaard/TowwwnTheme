


// Behavior data handler
let singleton = null;
const Globals = require( '../../../app/globals.js' );
class BehaviourDataHandler{

    /* ---- Constructor ---- */
    constructor() {
        if ( singleton != null ) return singleton;
        else singleton = this;
        this.state = { };
    }

    /* ---- Parse Data ---- */
    parseData( type, data ) {

        let catsRef = Globals.user.state.behaviourData.catRelatedClicks;
        if ( 'location-category' === type ) {

            if ( catsRef[ data.category_id ] != null ) catsRef[ data.category_id ]++;
            else catsRef[ data.category_id ] = 1;

        } else if ( 'event' === type ) {

            let request = new XMLHttpRequest();
            request.onload = (( resp ) => {
                let json = JSON.parse( resp.target.response )[0],
                    cats = json.categories;

                for ( let iter = 0; iter < cats.length; iter++ ) {
                    if ( catsRef[ cats[ iter ].category_id ] != null ) catsRef[ cats[ iter ].category_id ]++;
                    else catsRef[ cats[ iter ].category_id ] = 1;
                }
            });

            console.log(  'http://towwwn.dk/api/svendborg/locations/' + data.parentid  );
            request.open( 'GET', 'http://towwwn.dk/api/svendborg/locations/' + data.parentid );
            request.send();

        } console.log( Globals.user.state );
    }

}

// Creates singleton object and exports it
(() => { new BehaviourDataHandler(); })();
module.exports = singleton;
