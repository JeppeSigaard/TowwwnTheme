
// Search Module
var SearchModule = {
    
    // Vars
    settings: {
        keyword: '',
        getnum: 15,
        left_container: $('.left-container'),
        right_container: $('.right-container'),
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
        var events = EventModule.settings.events;

        // Loops through all events and assigns them a fitness score
        for ( var i = 0; i < events.length; i++ ) {
            console.log( 'hi' );
            var fitness = 0, tTitle = 0, tDesc = 0;
            var keywords = this.settings.keyword.split(' ');
            for ( var ki = 0; ki < keywords.length; ki++ ) {

                // Checks for includes of the individual keyword
                if ( keywords[ki].length > 1 ) {
                    tTitle += HelpFunctions.numOfIncludes( events[i].name[0].toLowerCase(), keywords[ki] ) * 2;
                    tDesc += HelpFunctions.numOfIncludes( events[i].description[0].toLowerCase(), keywords[ki] );
                }

                // Checks for includes of chars in the keyword
                for( var ni = 0; ni < keywords[ki].length; ni++ ) {
                    tTitle += HelpFunctions.numOfIncludes( events[i].name[0].toLowerCase(), keywords[ki].charAt(ni) ) / 15;
                    tDesc += HelpFunctions.numOfIncludes( events[i].name[0].toLowerCase(), keywords[ki].charAt(ni) ) / 120;
                }
            }

            // Adds elemnt if fitness is more than 0
            if ( tTitle + tDesc > 0 ) {
                fitness = tTitle + tDesc / 2;
                resp.push( [ fitness, events[i] ] )
            }
        }
        
        // Sorts the search results by fitness score
        resp.sort(function(a, b) {
            if ( a[0] < b[0] ) return 1;
            if ( a[0] > b[0] ) return -1;
            return 0;
        });
        
        // Renders the results
        this.render_results( resp );
        
    },
    
    // Render search results
    render_results: function( results ) {
        
        // Sets up the left container html variable
        var lc = '<div class="search-field-container">';
        lc += '<input type="text" class="search-field" /></div>';
        
        // Loops through results and generates html
        var fitness = 0, counter = 0; do {
            fitness = results[counter][0];
            if ( fitness <= 1 ) break;
            lc += '<div class="result">';
            lc += '<div class="result-title">'+results[counter][1].name+'</div></div>';
            counter++;
        } while ( fitness > 1 );
        
        // Sets up the right container html variable
        var rc = '';
        
        // Renders the html
        $('.left-container').html( lc );
        $('.right-container').html( rc );
        
    },
    
}




