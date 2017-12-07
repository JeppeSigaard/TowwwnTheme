

// Commercial data handler
class CommercialDataHandler {

    // Ctor
    constructor() {

    }

    // Get Commercials
    getCommercials( properties ) {

        return new Promise(( resolve, reject) => {

            // Set query string
            let query = '?stamp=' + new Date().getTime();
            if(properties != null){
                for(var k in properties){
                    if(properties.hasOwnProperty(k)){
                        query += '&' + encodeURIComponent(k) + '=' + encodeURIComponent(properties[k]);
                    }
                }
            }

            // Opens a new request
            let request = new XMLHttpRequest();
            request.onload = ( data ) => {
                let json = JSON.parse( data.target.response );

                resolve(json);
            };

            // Sends request
            request.open( 'GET', app_data.rest_api + '/commercials' + query );
            request.send();

        });
    }

} module.exports = CommercialDataHandler;
