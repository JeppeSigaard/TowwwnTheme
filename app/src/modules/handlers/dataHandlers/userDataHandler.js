


// User data handler
const Globals = require( '../../../app/globals.js' ),
      _ = require( '../../libaries/underscore/underscore_main.js' );

class User {

    // Constructor
    constructor() {

        this.state = {
            loggedIn: false,
            userId: null,
            accessToken: {
                token: null,
                expires: null,
            },
            fbData: { },
            behaviourData: {
                catRelatedClicks: { },
            }
        };

        // Login button
        _('.login-btn').on( 'click', ( e ) => {
            if ( this.state.loggedIn ) return;
            Globals.fb.login().then(() => {
                _('.login-btn').text( this.state.fbData.name.split(' ')[0] );
            });
        });

        // Before unload
        window.addEventListener( 'beforeunload', () => {
            if ( this.state.loggedIn ) {
                // Send data
            } else { /* Save in cookie? */ }
        });

    }

    // Parse fb login data
    parseFbLoginData( data ) {
        return new Promise((resolve,reject) => {
            if ( data.status != null &&
                 data.status === 'connected' ) {

                this.state.loggedIn = true;
                this.state.userId = data.authResponse.userID;
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
                    }; resolve();
                });

            } else {
                this.state.loggedIn = false;
                reject();
            }
        });
    }

} module.exports = User;

