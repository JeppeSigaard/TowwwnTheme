
// User module
var UserModule = {
    
    // Fields
    settings: {
        ready: false,
        name: '',
        events: [],
    },
    
    // Init
    init: function() {
        this.getAttendingEvents(function() {});
    },
    
    // Get attending events
    getAttendingEvents: function( callback ) {
        FacebookModule.getData( '/me', 'name,events{id,rsvp_status}', function( response ) {
            if ( typeof response.error === 'undefined' ) {
                this.settings.name = response.name;
                this.settings.events = response.events.data;
                this.settings.ready = true;
            }
            
            callback( );
        }.bind(this));
    },
    
    // Attending event
    attendingEvent: function( event, callback ) {
        this.getAttendingEvents(function() {
            for ( var i = 0; i < this.settings.events.length; i++ ) {
                if ( this.settings.events[i].id === event.fbid[0] ) {
                    callback( this.settings.events[0].rsvp_status, event );
                    return;
                }
            } callback( false, event );
        }.bind(this));
    },
    
};