

// FB Handler
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

    // Share
    share( href ) {

        // Shares stuff inline
        FB.ui({
            method: 'share',
            display: 'popup',
            href: href,
        }, response => {
            return response;
        });

    }

} module.exports = FBHandler;
