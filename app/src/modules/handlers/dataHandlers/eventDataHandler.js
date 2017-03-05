
// Event Data Handler
class EventDataHandler{

    // Ctor
    constructor() { this.futureEvents = null; }

    // Get future events
    getFutureEvents() {
        return new Promise((resolve, reject) => {

            // Returns future events, if already loaded
            if ( this.futureEvents !== null ) {
                resolve( this.futureEvents );
            }

            // Else load them in, and return them
            else {

                // Opens new request
                let xhr = new XMLHttpRequest();
                xhr.onload = function ( data ) {

                    // Sets future events field and resolves
                    let json = JSON.parse( data.target.response );
                    this.futureEvents = json.sort((a, b) => {
                        if ( a.start_time < b.start_time ) return -1;
                        if ( a.start_time > b.start_time ) return 1;
                        return 0;
                    }); resolve( this.futureEvents );

                }.bind(this);

                // Sends request
                xhr.open( 'GET', 'http://towwwn.dk/api/svendborg/events?per_page=50&page=1&after=now' );
                xhr.send();

            }

        });
    }

} module.exports = EventDataHandler;
