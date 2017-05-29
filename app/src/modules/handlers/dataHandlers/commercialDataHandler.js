

// Commercial data handler
class CommercialDataHandler {

    // Ctor
    constructor() { this.commercials = null }

    // Get Commercials
    getCommercials( properties ) {
        return new Promise(( resolve, reject) => {
            if ( this.commercials != null ) return this.commercials;

            // Set query string
            let c = 0, query = '';
            if(properties != null){
                for(var k in properties){
                    c++; query += (c > 1) ? '&' : '?';
                    if(properties.hasOwnProperty(k)){
                        query += encodeURIComponent(k) + '=' + encodeURIComponent(properties[k]);
                    }
                }
            }


            // Opens a new request
            let request = new XMLHttpRequest();
            request.onload = ( data ) => {
                let json = JSON.parse( data.target.response );
                this.commercials = json; resolve( json );
            };

            // Sends request
            request.open( 'GET', app_data.rest_api + 'svendborg/commercials' + query );
            request.send();

        });
    }

} module.exports = CommercialDataHandler;
