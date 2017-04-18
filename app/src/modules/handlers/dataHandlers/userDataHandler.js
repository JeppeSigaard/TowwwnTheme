


// User data handler
const Globals = require( '../../../app/globals.js' ),
      _ = require( '../../libaries/underscore/underscore_main.js' );

class User {

    // Constructor
    constructor() {
        
        this.state = {
            loggedIn: false,
            userFbid: null,
            accessToken: {
                token: null,
                expires: null,
            },
            fbData: { },
            dbData: { },
            behaviourData: {
                catRelatedClicks: { },
                timeData: {
                    event: { },
                    location: { },
                    locationcategory: { },
                }
            }
        };

        // Login button
        _('.login-btn').on( 'click', ( e ) => {
            if ( this.state.loggedIn ) return;
            Globals.fb.login().then(() => {
                _('.login-btn').text( this.state.fbData.name.split(' ')[0] );
            });
        });
        
        // On load, get behaviour statistics from cookie
        window.onload = (() => {
            let behaviourData = window._cookielib.read( 'behaviour_statistics' );
            if ( behaviourData !== '' ) this.state.behaviourData = JSON.parse( behaviourData );
        });

        // Before unload, uploads behaviour statistics
        window.onbeforeunload = (() => {

            if ( this.state.loggedIn ) {

                // Request Param
                let data = {
                    id : this.state.dbData.id,
                    token : this.state.accessToken.token,
                    meta_data : {
                        behaviour_statistics : this.state.behaviourData,
                    },
                };

                // Opens new request to sign on user
                let request = new XMLHttpRequest();
                request.onload = (( data ) => { });

                // Opens request & sets headers
                request.open( 'POST', 'http://towwwn.dk/api/svendborg/user/' + this.state.dbData.id, true );
                request.setRequestHeader("Content-type", "application/json");

                // Sends request
                request.send( JSON.stringify( data ) );

            } else { 
                window._cookielib.set( 'behaviour_statistics', JSON.stringify( this.state.behaviourData ), 30 );
            }

        });

    }

    // Parse fb login data
    parseFbLoginData( data ) {
        return new Promise((resolve,reject) => {
            if ( data.status != null &&
                 data.status === 'connected' ) {

                this.state.loggedIn = true;
                this.state.userFbid = data.authResponse.userID;
                this.state.accessToken = {
                    token: data.authResponse.accessToken,
                    expires: data.authResponse.expiresIn,
                };

                Globals.fb.get('/me?fields=name,birthday,email,location').then( resp => {

                    this.state.fbData = {
                        name : resp.name,
                        mail : resp.email,
                        birthday : resp.birthday,
                        location : resp.location,
                    };

                    // Request Param
                    let data = {

                        name  : this.state.fbData.name,
                        email : this.state.fbData.mail,
                        fbid  : this.state.userFbid,
                        token : this.state.accessToken.token,

                        client_id     : 'O8hovMTxdFK4ZehKnWuMExBH',
                        client_secret : 'Shbq4TrZFwQ6BlWWyq5PsHinr6hdcDssCMym0GffQlkfphgj',

                    };

                    // Opens new request to sign on user
                    let request = new XMLHttpRequest();
                    request.onload = (( data ) => {
                        let json = JSON.parse( data.target.response );
                        this.state.dbData = json;

                        // Opens new request to get user behaviour statistics
                        let request = new XMLHttpRequest();
                        request.onload = (( data ) => {
                            
                            let json = JSON.parse( data.target.response ),
                                obj = json.behaviour_statistics;
                            
                            // Converts arrays back into objects
                            let timeData = obj.timeData,
                                types = [ 'event', 'location', 'locationcategory' ];
                                
                            for ( let key of types ) {
                                if ( timeData[ key ].constructor.name === 'Array' ) {
                                    var tmpObject = { };
                                    for (var iter = 0; iter < timeData[ key ].length; iter++ ) {
                                        if ( timeData[ key ][ iter ] != null ) tmpObject[ iter ] 
                                            = timeData[ key ][ iter ];
                                    } timeData[ key ] = tmpObject;
                                }
                            }
                            
                            // Adds new behaviour data from login, to old loaded from cookie
                            let recursiveObjectAddition = (( newobj, oldobj ) => {
                                let response = { };
                                for ( let key of Object.keys( newobj ) ) {
                                    if ( newobj[ key ] == null || 
                                        oldobj == null ) continue;
                                    if ( typeof newobj[ key ] === 'object' &&
                                         typeof oldobj[ key ] === 'object' ) {
                                        response[ key ] = recursiveObjectAddition( newobj[ key ], oldobj[ key ] );
                                    } else {
                                        if ( newobj[ key ] != null && oldobj[ key ] != null ) {
                                            response[ key ] = newobj[ key ] + oldobj[ key ];
                                        } else if ( newobj[ key ] != null ) {
                                            response[ key ] = newobj[ key ];
                                        } else if ( oldobj[ key ] != null ) {
                                            response[ key ] = oldobj[ key ];
                                        }
                                    }
                                } return response;
                            }); 
                            
                            this.state.behaviourData = recursiveObjectAddition
                                    ( obj, this.state.behaviourData );
                            
                        });

                        // Sends request
                        request.open( 'GET', 'http://towwwn.dk/api/svendborg/user/'+this.state.dbData.id+
                                     '?user='+ this.state.dbData.id +
                                     '&token='+ this.state.accessToken.token +
                                     '&fields=behaviour_statistics' );

                        request.send();
                        resolve( data );

                    });

                    // Opens request & sets headers
                    request.open( 'POST', 'http://towwwn.dk/api/svendborg/user/signon', true );
                    request.setRequestHeader("Content-type", "application/json");

                    // Sends request
                    request.send( JSON.stringify( data ) );

                });

            } else {
                this.state.loggedIn = false;
                reject();
            }
        });
    }

} module.exports = User;

