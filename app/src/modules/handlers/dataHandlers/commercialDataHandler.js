

// Commercial data handler
class CommercialDataHandler {

    // Ctor
    constructor() { this.commercials = null }

    // Get Commercials
    getCommercials() {
        return new Promise(( resolve, reject) => {
            if ( this.commercials != null ) return this.commercials;

            // Opens a new request
            let request = new XMLHttpRequest();
            request.onload = ( data ) => {
                let json = JSON.parse( data.target.response );
                this.commercials = json; resolve( json );
            };

            // Sends request
            request.open( 'GET', rest_api+'svendborg/commercials' );
            request.send();

        });
    }

} module.exports = CommercialDataHandler;
