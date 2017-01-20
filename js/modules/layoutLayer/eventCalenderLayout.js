// Event calender view module
var EventCalenderModule = {
    
    // Fields
    settings: {  
        html: '',
        breakpointHtml: '',
        breakpoint: -1,
        breakpointArray: [],
        breakpointFrom: -1,
        breakpointTo: -1,
        breakpointView: '',
    },
    
    // Init
    init: function() {
    },
    
    // Render Events
    renderEventCalender: function( view, modifiers ) {

        this.settings.breakpointView = view;
        
        // Checks for modifiers
        var acceptOld = false, getNum = 25, from = -1, to = -1, buffer = false, sort = true;
        if ( typeof modifiers.acceptOld !== 'undefined' ) acceptOld = modifiers.acceptOld;
        if ( typeof modifiers.getNum !== 'undefined' ) getNum = modifiers.getNum;
        if ( typeof modifiers.from !== 'undefined' ) from = modifiers.from;
        if ( typeof modifiers.to !== 'undefined' ) to = modifiers.to;

        if ( typeof modifiers.content !== 'undefined' ) { buffer = modifiers.content; sort = false; }
        
        if ( !buffer ) {

            // Makes render buffer array
            var buffer = [], events = EventContentModule.settings.events, i;
            for ( i = 0; i < events.length; i++ ) {
                if ( buffer.length > getNum ) {
                    this.settings.breakpoint = i; break; }

                var eventTime = new Date(events[i].start_time.substr(0,16)).getTime();
                if ( !acceptOld && eventTime < new Date().getTime() ) continue;
                if ( from !== -1 && from > eventTime ) continue;
                if ( to !== -1 && to < eventTime ) continue;

                buffer.push( events[i] );
            }

            this.settings.breakpointArray = events;

        } else {
            this.settings.breakpointArray = modifiers.content;
            this.settings.breakpoint = getNum;
            buffer = buffer.slice(0,getNum);
        }

        this.settings.breakpointFrom = from;
        this.settings.breakpointTo = to;

        // Generates html
        for ( var i = 0; i < buffer.length; i++ ) {
            this.settings.html+=this.generateEventHtml( buffer[i] );
        }

        this.settings.breakpointHtml = this.settings.html;

        // Renders
        $(view).html( this.settings.html );
        this.settings.html = '';

    },
    
    // Load more
    loadMore: function( getNum ) {
        
        // Generates event array
        var buffer = [], bpArray = this.settings.breakpointArray;
        for ( var i = this.settings.breakpoint; i < bpArray.length; i++ ) {
            var eventTime = new Date(bpArray[i].start_time.substr(0,16)).getTime();
            if ( buffer.length >= getNum ) {
                this.settings.breakpoint = i; break; }

            if ( this.settings.breakpointFrom !== -1 && this.settings.breakpointFrom > eventTime ) continue;
            if ( this.settings.breakpointTo !== -1 && this.settings.breakpointTo < eventTime ) continue;

            buffer.push( bpArray[i] );
        }

        // If no more events were found
        if ( buffer.length < getNum ) {
            this.settings.breakpoint = bpArray.length;
        }
        
        if ( buffer.length === 0 ) return -1;

        // Renders the events
        for ( var i = 0; i < buffer.length; i++ ) {
            this.settings.breakpointHtml+=this.generateEventHtml( buffer[i] );
        }  $(this.settings.breakpointView).html( this.settings.breakpointHtml );

        // Rescales container
        setTimeout(function() {
            syncScroll.rescaleContainer();
        }, 150);

        // Return the rest
        return bpArray.length-this.settings.breakpoint;

    },

    // Generate Event HTML
    generateEventHtml: function( elem ) {
        
        // Sets up vars
        var response = '',
            time_formatted = HelpFunctions.formatDate( elem.start_time, false, false ),
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
        response += '<div class="imgcontainer" style="background-image:url('+elem.imgurl+')" ></div>';
        response += '<div class="eventtext">';
        response += '<div class="title">'+name+'</div>';
        response += '<div class="start_time">'+time_formatted+'</div>';
        response += '<div class="eventlocation-container">';
        response += '<div class="eventblackbar"></div>';
        response += '<div class="eventlocation">'+elem.parentname+'</div></div></div></div>';
        return response;
        
    },

}
