


// User data handler
const Globals = require( '../../../app/globals.js' ),
      _ = require( '../../libaries/underscore/underscore_main.js' ),
      HookHandler = require( '../../libaries/underscore/underscore_hookhandler.js' );

class User {

    // Constructor
    constructor() {

        this.hooks = new HookHandler();
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
            },

            hearts: {
                events: [],
                locations: []
            }

        };

        this.resetBehaviourStatistics();

        // On load, get behaviour statistics from cookie
        window.onload = (() => {
            this.applyCookieData();
        });

        // On login
        this.hooks.add('onlogin', () => {
            this.saveDataInCookie( 30 );
        });

        // Before unload, uploads behaviour statistics
        window.onbeforeunload = (() => {
            this.handleUnload();
        });

        // Save on a timer, for safari jerks
        setInterval(() => {
             this.handleUnload();
        }, 30 * 1000);

    }

    handleUnload(){

        this.saveDataInCookie( 30 );
        if ( this.state.loggedIn ) {

            // Request Param
            let data = {
                id : this.state.dbData.id,
                token : this.state.accessToken.token,
                meta_data : {
                    behaviour_statistics : this.state.behaviourData,
                    hearts : this.state.hearts
                },
            };

            // Opens new request to sign on user
            let request = new XMLHttpRequest();
            request.onload = (( data ) => { });

            // Opens request & sets headers
            request.open( 'POST', app_data.rest_api+'/user/' + this.state.dbData.id, true );
            request.setRequestHeader("Content-type", "application/json");

            // Sends request
            request.send( JSON.stringify( data ) );

        }
    }

    // Save Data in Cookie
    saveDataInCookie( expireDays ) {

        window._cookielib.set( 'loggedin', JSON.stringify( this.state.loggedIn ), expireDays );
        window._cookielib.set( 'fbid', JSON.stringify( this.state.userFbid ), expireDays );
        window._cookielib.set( 'fbData', JSON.stringify( this.state.fbData ), expireDays );
        window._cookielib.set( 'dbData', JSON.stringify( this.state.dbData ), expireDays );

        window._cookielib.set( 'accessToken', JSON.stringify( this.state.accessToken ), expireDays );
        window._cookielib.set( 'behaviourStatistics', JSON.stringify( this.state.behaviourData ), expireDays );
        window._cookielib.set( 'hearts', JSON.stringify( this.state.hearts ), expireDays );

    }

    // Apply cookie data
    applyCookieData() {

        let loggedIn = JSON.parse( window._cookielib.read( 'loggedin' ) ),
            fbid = JSON.parse( window._cookielib.read( 'fbid' ) ),
            fbData = JSON.parse( window._cookielib.read( 'fbData' ) ),
            dbData = JSON.parse( window._cookielib.read( 'dbData' ) ),

            accessToken = JSON.parse( window._cookielib.read('accessToken') ),
            behaviourStatistics = JSON.parse( window._cookielib.read('behaviourStatistics') );

        const raw_hearts = window._cookielib.read('hearts');
        let hearts = (raw_hearts != 'undefined') ? JSON.parse( raw_hearts ) : { events : null, locations : null };

        // Converts from old heart data format to the new one
        let convert = (( arr ) => {
            if ( arr == null ) return [];

            // Checks if should convert array
            let shouldConvert = false;
            for ( let n = 0; n < arr.length; n ++ ) {
                if ( typeof arr[n] !== 'number' ) {
                    shouldConvert = true; break; }
            } if ( !shouldConvert ) return arr;

            // Converts array
            let response = [];
            for ( let n = 0; n < arr.length; n ++ ) {
                if ( arr[ n ] == true ) response.push( n );
            } return response;

        });

        // Sets hearts
        this.state.hearts.events = convert( hearts.events );
        this.state.hearts.locations = convert( hearts.locations );
        if ( this.state.hearts.events == null ) this.state.hearts.events = [];
        if ( this.state.hearts.locations == null ) this.state.hearts.locations = [];

        // Sets behaviourStatistics
        if ( behaviourStatistics != null ) {
            this.state.behaviourData = behaviourStatistics;
        }

        if ( loggedIn ) {
            this.state.loggedIn = true;
            this.state.userFbid = fbid;
            this.state.accessToken = accessToken;
            this.state.fbData = fbData;
            this.state.dbData = dbData;
            this.loginToDB();
        }
    }

    // Predictions :O
    predictBehaviour( ) {

        return new Promise(( resolve, reject ) => {

            // Calculates 15 most liked
            let response = [  ],
                timeDataa = this.state.behaviourData.timeData;

            for ( let key of Object.keys( timeDataa.event ) ) { // event
                if ( timeDataa.event.hasOwnProperty( key ) ) {

                    let tmpresp = timeDataa.event[key] / 10000;
                    if ( !this.state.hearts.events.includes( key ) ) {
                        tmpresp * 0.8;
                    }

                    response.push({
                        id : key,
                        score : Math.floor( tmpresp )
                    })

                }
            }

            response.sort(( a, b ) => {
                if ( a.score > b.score ) return -1;
                if ( a.score < b.score ) return 1;
                return 0;
            }); response = response.slice(0,4);

            let finalresponse = [ ];
            for ( let n = 0; n < response.length; n ++ ) {
                finalresponse.push( response[n].id );
            }

            // Start new request
            let request = new XMLHttpRequest();
            request.onload = (( resp ) => {

                let json = JSON.parse( resp.target.response );
                resolve( json );

            });

            // Sends request
            request.open( 'GET', app_data.tools_api+'/predict?type=event&predictdata='+JSON.stringify( finalresponse ) );
            request.setRequestHeader(  'Content-type', 'application/x-www-form-urlencoded' );
            request.send( );

        });

    }

    // Parse fb login data
    parseFbLoginData( data ) {
        this.hooks.trigger( 'acceptedFb' );
        Globals.hooks.trigger( 'acceptedFb' );

        return new Promise((resolve,reject) => {
            if ( data.status != null &&
                 data.status === 'connected' ) {

                this.state.loggedIn = true;
                this.state.userFbid = data.authResponse.userID;
                this.state.accessToken = {
                    token: data.authResponse.accessToken,
                    expires: data.authResponse.expiresIn,
                };

                Globals.fb.get('/me?fields=name,email').then( resp => {

                    this.state.fbData = {
                        name : resp.name,
                        mail : resp.email,
                    };

                    // Request Param
                    let data = {

                        name  : this.state.fbData.name,
                        email : this.state.fbData.mail,
                        fbid  : this.state.userFbid,
                        token : this.state.accessToken.token,

                        client_id     : '4YVFKa6tYT6FmKhTNonasDX9',
                        client_secret : 'IIjxvk8Hbu9kX6010BzLEigekRmRcIICl6ojokt4IsBjvw8E',

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

                            this.state.hearts = json.hearts;

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

                            this.state.loggedIn = true;
                            this.hooks.trigger( 'onlogin' );
                            Globals.hooks.trigger( 'onlogin' );

                        });

                        // Sends request
                        request.open( 'GET', app_data.rest_api+'/user/'+this.state.dbData.id+
                                      '?user='+ this.state.dbData.id +
                                      '&token='+ this.state.accessToken.token +
                                      '&fields=hearts,behaviour_statistics' );

                        request.send();
                        resolve( data );

                    });

                    // Opens request & sets headers
                    request.open( 'POST', app_data.rest_api+'/user/signon', true );
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

    // Login to db
    loginToDB( ) {
        return new Promise((resolve,reject) => {

            // Request Param
            let data = {
                name : (this.state.fbData != null) ? this.state.fbData.name : this.state.dbData.display_name,
                email : (this.state.fbData != null) ? this.state.fbData.mail : this.state.dbData.email,
                fbid  : this.state.userFbid,
                token : this.state.accessToken.token,

                client_id     : '4YVFKa6tYT6FmKhTNonasDX9',
                client_secret : 'IIjxvk8Hbu9kX6010BzLEigekRmRcIICl6ojokt4IsBjvw8E',

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

                    if ( json.hearts != null ) {

                        // Converts from old heart data format to the new one
                        let convert = (( arr ) => {
                            if ( arr == null ) return [];

                            // Checks if should convert array
                            let shouldConvert = false;
                            for ( let n = 0; n < arr.length; n ++ ) {
                                if ( typeof arr[n] !== 'number' ) {
                                    shouldConvert = true; break; }
                            } if ( !shouldConvert ) return arr;

                            // Converts array
                            let response = [];
                            for ( let n = 0; n < arr.length; n ++ ) {
                                if ( arr[ n ] == true ) response.push( n );
                            } return response;

                        });

                        // Sets hearts
                        this.state.hearts.events = convert( json.hearts.events );
                        this.state.hearts.locations = convert( json.hearts.locations );
                        if ( this.state.hearts.events == null ) this.state.hearts.events = [];
                        if ( this.state.hearts.locations == null ) this.state.hearts.locations = [];

                    }

                    // Converts arrays back into objects
                    if ( obj != null ) {

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

                    }

                    this.state.loggedIn = true;
                    this.hooks.trigger( 'onlogin' );

                });

                // Sends request
                request.open( 'GET', app_data.rest_api+'/user/'+this.state.dbData.id+
                             '?user='+ this.state.dbData.id +
                             '&token='+ this.state.accessToken.token +
                             '&fields=behaviour_statistics,hearts' );

                request.send();
                resolve( data );

            });

            // Opens request & sets headers
            request.open( 'POST', app_data.rest_api+'/user/signon', true );
            request.setRequestHeader("Content-type", "application/json");

            // Sends request
            request.send( JSON.stringify( data ) );

        });

    }

    // Log out
    logOut() {

        this.state.loggedIn = false;
        this.state.behaviourData = {
            catRelatedClicks: { },
            timeData: {
                event: { },
                location: { },
                locationcategory: { },
            }
        };

        window._cookielib.set( 'data', JSON.stringify( this.state ), 30 );
        this.hooks.trigger( 'onlogout' );
        Globals.hooks.trigger( 'onlogout' );

    }

    // Reset Behaviour Data
    resetBehaviourStatistics() {

        // Request Param
        let data = {
            id : this.state.dbData.id,
            token : this.state.accessToken.token,
            meta_data : {
                behaviour_statistics : { },
                hearts: { events: [ ], locations: [ ] }
            },
        };

        // Opens new request to sign on user
        let request = new XMLHttpRequest();
        request.onload = (( data ) => { });

        // Opens request & sets headers
        request.open( 'POST', app_data.rest_api+'/user/' + this.state.dbData.id, true );
        request.setRequestHeader("Content-type", "application/json");

        // Sends request
        request.send( JSON.stringify( data ) )

    }


} module.exports = User;
