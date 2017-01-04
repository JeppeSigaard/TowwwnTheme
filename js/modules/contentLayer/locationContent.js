// Location module
var LocationModule = {
    
    // Fields
    settings: {
        ready: false,
        page_counter: 1,
        locations: [],
        callback: null,
    },
    
    // Ctor
    init: function( cb ) {
        this.settings.callback = cb;
        this.get_locations();
    },
    
    // Get locations
    get_locations() {
        
        // Opens up new xhrequest
        var request = new XMLHttpRequest();
        request.onload = function( data ) {
            
            // Loop through data and plops it into array
            var jsonResponse = $.parseJSON( data.target.response );
            for ( var i = 0; i < jsonResponse.length; i++ ) {
                this.settings.locations.push( jsonResponse[i] );
            }
            
            // If no elems were received, loop done
            if ( jsonResponse.length < 1 ) {
                this.settings.page_counter = 0;
                this.settings.ready = true;
            } else {
                this.settings.page_counter++;
                this.get_locations( );    
            }
            
        }.bind(this);
        
        // Specifies get url, and sends
        request.open( 'GET', rest_api+'locations?per_page=100&page='+this.settings.page_counter );
        request.send();
        
    },
    
    // Render locations
    render_locations: function() {
    },
    
    // Generate location html
    generate_location_html: function() {
    },
    
}
