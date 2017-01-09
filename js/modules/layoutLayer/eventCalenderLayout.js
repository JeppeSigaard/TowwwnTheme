// Event calender view module
var EventCalenderModule = {
    
    // Fields
    settings: {  
        html: '',
    },
    
    // Init
    init: function() {
    },
    
    // Render Events
    renderEventCalender: function( view, modifiers ) {
        
        // Checks for modifiers
        var acceptOld = false, getNum = 37, from = -1, to = -1, buffer = false, sort = true;
        if ( typeof modifiers.acceptOld !== 'undefined' ) acceptOld = modifiers.acceptOld;
        if ( typeof modifiers.getNum !== 'undefined' ) getNum = modifiers.getNum;
        if ( typeof modifiers.from !== 'undefined' ) from = modifiers.from;
        if ( typeof modifiers.to !== 'undefined' ) to = modifiers.to;
        if ( typeof modifiers.content !== 'undefined' ) { buffer = modifiers.content; sort = false; }
        
        if ( !buffer ) {

            // Makes render buffer array
            var buffer = [], events = EventContentModule.settings.events;
            for ( var i = 0; i < events.length; i++ ) {
                if ( buffer.length > getNum ) break;

                var eventTime = new Date(events[i].start_time[0].substr(0,16)).getTime();
                if ( !acceptOld && eventTime < new Date().getTime() ) continue;
                if ( from !== -1 && from > eventTime ) continue;
                if ( to !== -1 && to < eventTime ) continue;

                buffer.push( events[i] );
            }

            // Sorts buffer
            buffer.sort( function( a, b ) {
                var aTime = new Date(a.start_time[0].substr(0,16)).getTime();
                var bTime = new Date(b.start_time[0].substr(0,16)).getTime();
                if ( aTime < bTime ) return -1;
                if ( aTime > bTime ) return 1;
                return 0;
            });

        }

        // Generates html
        for ( var i = 0; i < buffer.length; i++ ) {
            this.settings.html+=this.generateEventHtml( buffer[i] );
        }
        
        // Renders
        $(view).html( this.settings.html );
        this.settings.html = '';
        
        // Reload view heights
        if(ViewHandler.settings.poly_view){
            setTimeout(function(){
                $('.left-container').css('height', 'auto');
                $('.right-container').css('height', $('.sync-container').innerHeight());
                $('.content-container').flickity('reloadCells');
                $('.left-container, .right-container').css('height', $('.content-container .flickity-viewport').height());
                $(window).trigger('scroll');
            },150);
        }
        
    },
    
    // Generate Event HTML
    generateEventHtml: function( elem ) {
        
        // Sets up vars
        var response = '',
            time_formatted = HelpFunctions.formatDate( elem.start_time[0] ),
            name = String(elem.name).substr(0, 36) + ( String(elem.name).substr(36,99).split( ' ' )[0] );
        
        // Adds length formatting to name
        if ( name.length !== String(elem.name).length ) name += ' ...';
        var words = name.split(' ');
        for ( var i = 0; i < words.length; i++ ) {
            if ( words[i].length > 14 ) {
                words[i] = words[i].substr(0,14)+'-<br />'+words[i].substr(12,999999999);
            } 
        } name = words.join(' ');
        
        // Generates the html itself
        var response = '<div class="event" id="'+elem.id+'">';
        response += '<div class="imgcontainer" style="background-image:url('+elem.imgurl[0]+')" ></div>';
        response += '<div class="eventtext">';
        response += '<div class="title">'+name+'</div>';
        response += '<div class="start_time">'+time_formatted+'</div>';
        response += '<div class="eventlocation-container">';
        response += '<div class="eventblackbar"></div>';
        response += '<div class="eventlocation">'+elem.parentname+'</div></div></div></div>';
        return response;
        
    },
    
}
