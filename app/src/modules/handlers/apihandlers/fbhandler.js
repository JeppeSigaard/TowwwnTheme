


// FB Handler
const Globals = require( '../../../app/globals.js' );
class FBHandler {
    
    // Constructor
    constructor() {
        
        // Retrieves the facebook sdk
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1253090394747963', // Retrieve from backend?
                xfbml      : true,
                version    : 'v2.8'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            let js, fjs = d.getElementsByTagName(s)[0];
            if ( d.getElementById(id) ) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
    }
    
    // Login
    login( scope ) {
        scope = scope == null ? 'email,user_birthday,user_location' :
            ( typeof scope === 'object' ? scope.join(',') : scope );

        return new Promise(( resolve, reject ) => {
            FB.login( response => {
                if ( response.status === 'connected' ) {
                    Globals.user.parseFbLoginData( response ).then(() => {
                        resolve( response );
                    });
                } else reject( response );
            }, { scope: scope });
        });
    }

    // Share
    share( href ) {
        FB.ui({
            method: 'share',
            display: 'popup',
            href: href,
        }, response => { 
            return response; 
        });
    }

    // Get data
    get( ref ) {
        return new Promise(( resolve, reject ) => {
            FB.api( ref , response => { resolve(response); });
        });
    }
    
} module.exports = FBHandler;
