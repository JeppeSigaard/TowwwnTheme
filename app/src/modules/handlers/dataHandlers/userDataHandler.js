


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

            } else { /* Save in cookie? */ }

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
                            let json = JSON.parse( data.target.response );
                            this.state.behaviourData = json.behaviour_statistics;
                            console.log( this.state );
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

