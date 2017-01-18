
// Search Module
var SearchModule = {
    
    // Vars
    settings: {
        keyword: '',
        getnum: 15,
        left_container: $('.left-container .content'),
        right_container: $('.right-container .content'),
    },
    
    // Init
    init: function() {
        this.bindUIActions();
    },
    
    // Bind UI Actions
    bindUIActions: function() {
        
        // Visual
        $('#searchfield').on('focus', function() {
            $('#searchlabel').addClass("not-visible");
         });

        $('#searchfield').on('focusout', function() {
            if ($(this).val() == "") {
                $('#searchlabel').removeClass("not-visible");
            }
        });
        
        // Search itself
        $('#searchfield').on( 'keyup', function(e) {
            this.settings.keyword = $('#searchfield').val().toLowerCase();
            if ( e.keyCode === 13 && this.settings.keyword !== '' ) {
                this.search();
            }
        }.bind(this));
        
    },
    
    // Search function
    search: function() {
        
        // Checks if events have been loaded in
        var resp = [];
        var events = EventContentModule.settings.events;

        // Loops through all events and assigns them a fitness score
        for ( var i = 0; i < events.length; i++ ) {
            var fitness = 0, tTitle = 0, tDesc = 0, tParent = 0;
            var keywords = this.settings.keyword.split(' ');
            for ( var ki = 0; ki < keywords.length; ki++ ) {

                // Checks for includes of the individual keyword
                if ( keywords[ki].length > 1 ) {
                    tTitle += HelpFunctions.numOfIncludes( events[i].name.toLowerCase(), keywords[ki] ) * 2;
                    tParent += HelpFunctions.numOfIncludes( events[i].parentname.toLowerCase(), keywords[ki] ) * 4;

                    if ( events[i].description !== null ) {
                        tDesc += HelpFunctions.numOfIncludes( events[i].description.toLowerCase(), keywords[ki] ) / 2;
                    }
                }
            }

            // Adds elemnt if fitness is more than 0
            fitness = tTitle + tDesc + tParent;
            if ( fitness >= 4 || tTitle > 0 ) {
                resp.push( [ fitness, events[i] ] );
            }
        }
        
        // Sorts the search results by fitness score
        resp.sort(function(a, b) {
            if ( a[0] < b[0] ) return 1;
            if ( a[0] > b[0] ) return -1;
            return 0;
        });
        
        // Renders the results
        var events = [];
        for ( var i = 0; i < resp.length; i++ ) {
            events.push( resp[i][1] );
        }
        
        EventCalenderModule.renderEventCalender('.eventscontainer', { acceptOld: true, getNum: 0, content: events } );
        $('.load-more').trigger('click');
        ViewHandler.closeSingleView();
        ViewHandler.reload_view( true );
        
    },
    
}




