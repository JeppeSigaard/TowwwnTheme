
// Widget way of doing stuff
var EventContentModule = {
    
    // Variables
    settings: {
        cb: function() {},
        ready: false,
        get_url: rest_api+'events?per_page=100&page=',
        page_counter: 1,
        default_appendSelector: '.eventscontainer',
        events: [],
        placeholder_img: 'https://developer.walgreens.com/sites/default/files/404.jpg',
    },
    
    // Ctor
    init: function( cb ) {
        this.settings.cb = cb;
        this.get_events();
    },
    
    // Gets events and assigns them to event var
    get_events: function() {
        
        // Opens xhr request
        var request = new XMLHttpRequest();
        request.onload = function( data ) {
            
            var json = $.parseJSON( data.target.response );
            for ( var i = 0; i < json.length; i++ ) {
                if ( json[i].imgurl[0] === 'undefined' || json[i].imgurl[0] === null ) {
                    json[i].imgurl[0] = this.settings.placeholder_img; }
                this.settings.events.push( json[i] );
            }
            
            if ( json.length < 1 ) {
                this.render_ready = true;
                this.settings.page_counter = 0;
                this.settings.events.sort(function( a, b ) {
                    if( a.start_time[0] < b.start_time[0] ) return -1;
                    if( a.start_time[0] > b.start_time[0] ) return 1;
                    return 0;
                });
                
                this.settings.cb();
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




