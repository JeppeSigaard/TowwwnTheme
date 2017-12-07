

// Search Data Handler
let instance = null;
class SearchDataHandler {

    // Constructor
    constructor() {
        if ( instance != null ) return instance;
        else instance = this;
    }

    // Get search results
    getSearchResults( keyword ) {
        return new Promise(( resolve, reject ) => {
            let request = new XMLHttpRequest();
            request.onload = (( response ) => {
                let json = JSON.parse( response.target.response ),
                    resp = { events: [], locations: [] };

                for ( let obj of json ) {
                    if ( obj.type === 'event' ) resp.events.push( obj );
                    if ( obj.type === 'location' ) resp.locations.push( obj );
                } resolve( resp );
            });

            request.open( 'GET', app_data.rest_api + '/discover/'+keyword + '?orderby=ID&order=desc');
            request.send();
        });
    }

} module.exports = SearchDataHandler;
