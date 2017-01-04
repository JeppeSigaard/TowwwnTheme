<?php

// Requires the fb php sdk
require_once __DIR__ . '/fb-sdk/src/Facebook/autoload.php';

// Creates class for fb-handling
class FBHandler {
    
    // Fields
    private $app_id = '1253090394747963';
    private $app_secret = '85ace41d494e339fd9a130b86d944a95';
    
    public $loginUrl = '#', $access_token = '';
    private $fb, $helper;
    
    // Get instance
    static function getInstance() {
        static $instance = null;
        if ( $instance === null ) $instance = new FBHandler();
        return $instance;
    }
    
    // Ctor
    private function __construct( ) {
        
        // Inits facebook sdk
        $this->fb = new Facebook\Facebook([
          'app_id' => $this->app_id,
          'app_secret' => $this->app_secret,
          'default_graph_version' => 'v2.5',
        ]);    
        
        // Gets login url
        $this->helper = $this->fb->getRedirectLoginHelper();
        $this->loginUrl = $this->helper->getLoginUrl( get_site_url(), ['rsvp_event']);
        
    }
    
    // Login callback stuffy
    function loginCallback() {
        try {
            $this->access_token = $this->helper->getAccessToken();
        } 
        catch (Facebook\Exceptions\FacebookSDKException $e) { }
        catch (Facebook\Exceptions\FacebookResponseException $e) { }
        
        if ( isset( $this->access_token ) ) {
            $_SESSION['fb_access_token'] = $this->access_token;
            header("Location: ".get_site_url());
            die();
        }
    }
    
}

// Creates new handler and checks for log in
if ( !isset( $_SESSION['fb_access_token'] ) ) {
    FBHandler::getInstance()->loginCallback();
}

add_filter( 'fb_handler', function( $args = '' ) {
    return FBHandler::getInstance();
});