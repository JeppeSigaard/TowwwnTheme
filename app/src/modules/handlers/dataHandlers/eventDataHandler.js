
// Event Data Handler
class EventDataHandler{

    // Ctor
    constructor() { 
        this.futureEvents = []; 
        this.futurePage = 1;
    }

    // Get future events
    getFutureEvents( getNum, cont ) {
        return new Promise((resolve, reject) => {

            // Opens new request
            let xhr = new XMLHttpRequest();
            xhr.onload = function ( data ) {

                // Sets future events field and resolves
                let json = JSON.parse( data.target.response ),
                    tmp = json.sort((a, b) => {
                    if ( a.start_time < b.start_time ) return -1;
                    if ( a.start_time > b.start_time ) return 1;
                    return 0;
                }); 
                
                if ( cont ) {
                    for ( var elem of tmp ) {
                        this.futureEvents.push( elem );
                    } resolve( this.futureEvents );
                } else {
                    resolve( tmp );
                }

            }.bind(this);

            // Sends request 
            if ( cont ) {
                xhr.open( 'GET', 'http://towwwn.dk/api/svendborg/events?per_page='+getNum+'&page='+this.futurePage+'&after=now' );
                this.futurePage ++;
            } else {
                xhr.open( 'GET', 'http://towwwn.dk/api/svendborg/events?per_page='+getNum+'&page=1&after=now' );
            }
                
            xhr.send();

        });
    }
    
    // Get events
    getEvents( properties ) {
        return new Promise(( resolve, reject ) => {
            
            // Sets get params using properties
            if ( typeof properties === 'object' ||
                 properties.length < 1 ) {
                
                let str = [];
                for ( let key in properties ) {
                    str.push( key+'='+properties[key] ); } 

                if ( str.length > 0 ) {
                    str.join(':');
                } else reject();
                
                // Opens new request
                let request = new XMLHttpRequest();
                request.addEventListener( 'load', ( data ) => {
                    let json = JSON.parse( data.target.response ),
                        resp = json.sort(( a,b ) => {
                            if ( a.start_time < b.start_time ) return -1;
                            if ( a.start_time > b.start_time ) return 1;
                            return 0;
                        });
                    resolve ( resp );
                });
                
                // Sends request
                request.open( 'GET', 'http://towwwn.dk/api/svendborg/events?' + str );
                request.send();
                
            } else {
                reject( 'When no propeties needed, use other event data handler method' );    
            }
            
        });
    }

} module.exports = EventDataHandler;
