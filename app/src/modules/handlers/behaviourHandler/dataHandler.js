


// Behavior data handler
let singleton = null;
const Globals = require( '../../../app/globals.js' );
class BehaviourDataHandler{

    /* ---- Constructor ---- */
    constructor() {
        if ( singleton != null ) return singleton;
        else singleton = this;
    }

    /* ---- Parse Data ---- */
    parseData( type, data ) {

        let catsRef = Globals.user.state.behaviourData.catRelatedClicks;
        if ( 'location-category' === type ) {

            if ( catsRef[ data.category_id ] == null )
                catsRef[ data.category_id ] = 0;

            catsRef[ data.category_id ]++;

        } else if ( 'location' === type ) {

            for ( let iter = 0; iter < data.categories.length; iter++ ) {
                if ( catsRef[ data.categories[ iter ].category_id ] == null )
                    catsRef[ data.categories[ iter ].category_id ] = 0;

                catsRef[ data.categories[ iter ].category_id ]++;
            }

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

            request.open( 'GET', 'http://towwwn.dk/api/svendborg/locations/' + data.parentid );
            request.send();

        }
    }

    // Parse time data
    parseTimeData( type, id, time, parentid ) {
        
        let timeData = Globals.user.state.behaviourData.timeData;
        if ( timeData[ type ][ id ] == null ) timeData[ type ][ id ] = 0;
        timeData[ type ][ id ] += time;
        
        if ( type === 'event' ) {
            
            let request = new XMLHttpRequest();
            request.onload = (( resp ) => {
                
                let json = JSON.parse( resp.target.response )[0],
                    cats = json.categories;

                for ( let iter = 0; iter < cats.length; iter++ ) {
                    if ( timeData.locationcategory[ cats[ iter ].category_id ] == null )
                        timeData.locationcategory[ cats[ iter ].category_id ] = time;
                    else timeData.locationcategory[ cats[ iter ].category_id ] += time;
                }
                
            });

            request.open( 'GET', 'http://towwwn.dk/api/svendborg/locations/' + parentid );
            request.send();
            
        }
    }

}

// Creates singleton object and exports it
(() => { new BehaviourDataHandler(); })();
module.exports = singleton;
