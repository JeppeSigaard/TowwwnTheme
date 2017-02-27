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
        page : 2,
    },
    
    // Init
    init: function() {
        this.bindUIActions();
    },

    // Bind UI Actions
    bindUIActions: function() {
        $(window).on('resize', function() {
            EventCalenderModule.setEventCalendarWidth();
        });
        
        $(document).on( 'mouseup', '.event', function( e ) {
            if ( !$('.eventtext', this).hasClass('filled') ) {
                $('.filled').css({ 'background-color' : 'transparent' });
                $('.filled .ripple').addClass('animateBack');
                $('.bookmark-mode').removeClass('bookmark-mode');
                $('.filled .ripple').css({
                    'left': ( $('.filled').innerWidth() / 2 - $('.filled .ripple').outerWidth() / 2 ) + 'px',
                    'top': ( $('.filled').innerHeight() / 2 - $('.filled .ripple').outerHeight() / 2 ) + 'px',
                });

                $('.eventtext', this).addClass('bookmark-mode');
                $('.eventtext .ripple', this).addClass('animate');
                $('.eventtext .ripple', this).css({
                    'left': ( e.pageX - $('.eventtext', this).offset().left - $('.ripple', this).outerWidth() / 2 ) + 'px',
                    'top': ( e.pageY - $('.eventtext', this).offset().top - $('.ripple', this).outerWidth() / 2 ) + 'px',
                });

                setTimeout(function() {
                    $('.eventtext .ripple').removeClass('animate');
                    $('.filled .ripple').removeClass('animateBack');
                    $('.filled').removeClass('filled');
                    $('.eventtext', this).addClass('filled');
                }.bind(this), 300);
            }
        });
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
        this.settings.breakpointHtml = '';
        for ( var i = 0; i < buffer.length; i++ ) {
            this.settings.breakpointHtml+=this.generateEventHtml( buffer[i] );
        }  $(this.settings.breakpointView).append( this.settings.breakpointHtml );

        // Rescales container
        setTimeout(function() {
            syncScroll.rescaleContainer();
            EventCalenderModule.setEventCalendarWidth();
        }, 150);

        // Return the rest
        return bpArray.length-this.settings.breakpoint;

    },

    // Generate Event HTML
    generateEventHtml: function( elem, outerClass ) {
        
        // Sets up vars
        var response = '',
            time_formatted = HelpFunctions.formatDate( elem.start_time, false, true, true, false, true),
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
        var outerClass = typeof outerClass !== 'undefined' ? outerClass : 'event';
        var response = '<div class="'+outerClass+'" id="calendar-event-'+elem.id+'" data-type="event" data-id="'+elem.id+'">';
        
        if ( typeof elem.images !== 'undefined' &&
            elem.images[130] !== null &&
            typeof elem.images[130] !== 'undefined' ) {
            response += '<div class="imgcontainer" data-image-src="'+elem.images[130]+'" >';
            response += '<div class="loader"><img src="'+template_uri+'/style/assets/icons/loading-white.svg" /></div></div>';
        } else if ( elem.imgurl !== '' &&
                   elem.imgurl !== null &&
                   typeof elem.imgurl !== 'undefined' ) {
            response += '<div class="imgcontainer" data-image-src="'+elem.imgurl+'" >';
            response += '<div class="loader"><img src="'+template_uri+'/style/assets/icons/loading-white.svg" /></div></div>';
        } else {
            response += '<div class="imgcontainer imgloaded" style="background-image:url(http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png)" >';
            response += '<div class="loader"><img src="'+template_uri+'/style/assets/icons/loading-white.svg" /></div></div>';
        }

        response += '<div class="eventtext">';
        response += '<div class="ripple"></div>';
        response += '<div class="title">'+name+'</div>';
        response += '<div class="start_time">'+time_formatted+'</div></div>';
        response += '<div class="eventlocation-container">';
        response += '<div class="eventblackbar"></div>';
        response += '<div class="eventlocation">'+elem.parentname+'</div></div></div>';
        return response;
        
    },

    // Rescales widths of last children in event calendar
    setEventCalendarWidth : function(){

        var lastOffset = -1,
            rowLength = 0,
            oneRow = true;


        $('.event').each( function( iter, elem ) {
            if ( lastOffset === -1 ) {
                lastOffset = elem.offsetTop;
                rowLength++;
            } else {
                if ( lastOffset === elem.offsetTop ) {
                    rowLength++;
                } else {
                    oneRow = false;
                    return;
                }
            }
        });

        var ecc = $('.eventscontainer').children(),
            rest = ecc.length % rowLength;
        ecc.css('max-width', 'none').removeClass('last-row');

        if ( oneRow === false ) {
            for ( var i = 0; i < rest; i++ ) {
                $('#'+ecc[ecc.length-(i+1)].attributes.id.value).css('max-width', $('#'+ecc[0].attributes.id.value).outerWidth() + 'px').addClass('last-row');
            }
        } else {
            if ( !$('.eventscontainer').hasClass('lineLayout') ) {
                ecc.css('max-width', '195px').addClass('last-row');
            }
        }
    },

}
