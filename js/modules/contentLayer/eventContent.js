
// Widget way of doing stuff
var EventContentModule = {
    
    // Variables
    settings: {
        cb: function() {},
        ready: false,
        get_url: rest_api+'events?per_page=100&page=',
        upcoming_get_url: rest_api+'events?page=1&after=now&per_page=',
        page_counter: 1,
        default_appendSelector: '.eventscontainer',
        events: [],
        tmp_events: [],
    },
    
    // Ctor
    init: function( cb ) {
        this.settings.cb = cb;
        this.get_upcoming_events( 25 );
    },

    // Get upcoming event
    get_upcoming_events: function( getnum ) {

        // Opens request
        var xhr = new XMLHttpRequest();
        xhr.onload = function( data ) {
            var json = $.parseJSON( data.target.response );
            for ( var i = 0; i < json.length; i++ ) {
                this.settings.events.push( json[i] );
            }

            this.settings.ready = true;
            this.settings.cb( true );
            this.get_events();
        }.bind(this)

        xhr.open( 'GET', this.settings.upcoming_get_url+getnum );
        xhr.send();

    },
    
    // Gets events and assigns them to event var
    get_events: function() {
        
        // Opens xhr request
        var request = new XMLHttpRequest();
        request.onload = function( data ) {
            
            var json = $.parseJSON( data.target.response );
            for ( var i = 0; i < json.length; i++ ) {
                this.settings.tmp_events.push( json[i] );
            }
            
            if ( json.length < 1 ) {
                this.render_ready = true;
                this.settings.page_counter = 0;
                this.settings.tmp_events.sort(function( a, b ) {
                    if( a.start_time < b.start_time ) return -1;
                    if( a.start_time > b.start_time ) return 1;
                    return 0;
                });
                
                this.settings.events = this.settings.tmp_events;
                this.settings.tmp_events = [ ];
                this.settings.cb( false );
                return;
            } 
            
            this.settings.page_counter ++;
            this.get_events();
            
        }.bind(this);
        
        // Sends xhr request
        request.open('GET', this.settings.get_url+this.settings.page_counter.toString());
        request.send();
    
    },
    
}




