 // Facebook Module
var FacebookModule = {
    
    // Fields
    settings: {
        access_token: '',
        loggedin: false,
    },
    
    // Init
    init: function() {
        
        // Inits facebook
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1253090394747963',
                xfbml      : true,
                version    : 'v2.8'
            });
            FB.AppEvents.logPageView();
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        // Binds UI Actions
        this.bindUIActions();
        
    },
    
    // Bind UI Actions
    bindUIActions: function() {  
        
        // Login btn
        $('.fb-login-btn').on('click', function() {
            
            // Logs users in or out
            if ( !$('.fb-login-btn').hasClass('loggedin') ) {
                this.login();
            } else {
                this.logout();
            }
            
        }.bind(this));
        
    },
    
    // Login
    login: function( cb ) {
        FB.login(function(response) {
            if (response.status === 'connected') {
                this.settings.access_token = response.authResponse.accessToken;
                this.settings.loggedin = true;
                $('.fb-login-btn').html('Log ud').addClass('loggedin');
                UserModule.init();
                if ( typeof cb !== 'undefined' ) cb( true );
                return;
            }
            
            if ( typeof cb !== 'undefined' ) cb( false );
        }.bind(this), { scope: 'rsvp_event,user_events' }); 
    },
    
    // Logout
    logout: function() {
        FB.logout(function(response) {
            this.settings.loggedin = false;
            $('.fb-login-btn').html('Log ind').removeClass('loggedin');
            this.settings.access_token = '';
        }.bind(this));
    },
    
    // Get data
    getData: function( place, fields, cb ) {
        FB.api(
            place, 'GET',
            { "fields": fields }, cb
        );
    },
    
    // Post data
    eventAction: function( eventid, action ) {
        FB.api(
            eventid+'/'+action, 'POST',
            {}, function( response ) {}
        );
    },
    
};










