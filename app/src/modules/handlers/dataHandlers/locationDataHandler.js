

// Event Data Handler
class LocationDataHandler{

    // Ctor
    constructor() {
        this.locations = [];
    }

    // Get future events
    getAllLocations( ) {
        return new Promise((resolve, reject) => {

            // Opens new request
            let xhr = new XMLHttpRequest();
            xhr.onload = function ( data ) {

                // Resolves all locations
                this.locations = JSON.parse( data.target.response );
                resolve( this.locations );

            }.bind(this);

            // Sends request
            xhr.open( 'GET', 'https://towwwn.dk/api/svendborg/locations?per_page=100000000&page=1' );
            xhr.send();

        });
    }

    // Get Category specific locations
    getCategorySpecificLocation( catID ) {
        return new Promise(( resolve, reject ) => {

            // Opens new request
            let xhr = new XMLHttpRequest();
            xhr.onload = function ( data ) {
                resolve( JSON.parse( data.target.response ) )
            }.bind(this);

            // Sends request
            xhr.open( 'GET', 'https://towwwn.dk/api/svendborg/locations?per_page=100000000&page=1&cat='+catID );
            xhr.send();

        });
    }

} module.exports = LocationDataHandler;
