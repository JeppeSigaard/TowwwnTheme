
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
        let HeaderModule = require( './layoutLayer/headerLayout.js' );
        
        $('#searchcontainer').on('submit', function(e) {
            e.preventDefault();
            this.search($('#searchfield').val());
         }.bind(this));

        // Visual
        $('#searchfield').on('focus', function() {
            $('#searchfield').select();
            $('#searchlabel').addClass("not-visible");
         });

        $('#searchfield').on('focusout', function() {
            if ($(this).val() == "") {
                $('#searchlabel').removeClass("not-visible");
            }
        });
        
        $('#searchicon').on('click', function() {
            this.settings.keyword = $('#searchfield').val().toLowerCase();
            this.search();
            $('#searchfield').blur();
            HeaderModule.show_menu( true );
        }.bind(this));

        // Search itself
        var lsKeyUp = new Date().getTime();
        $('#searchfield').on( 'keyup', function(e) {
            this.settings.keyword = $('#searchfield').val().toLowerCase();
            lsKeyUp = new Date().getTime();

            if ( e.keyCode === 13 ) {
                this.search();
                $('#searchfield').blur();
                HeaderModule.show_menu( true );
            }

            else{
               /* setTimeout(function() {
                if ( new Date().getTime() - lsKeyUp > 1500 ) {
                    this.search(); }
                }.bind(this), 1500); */
            }
        }.bind(this));
        
    },
    
    // Search function
    search : function( term ) {
        let LocationCategoryModule = require( './contentLayer/locationCategoryContent.js' );
        let FrontPageModule = require( './layoutLayer/frontpageLayout.js' );
        let LocationModule = require( './contentLayer/locationContent.js' );
        let EventContentModule = require( './contentLayer/eventContent.js' );
        let HelpFunctions = require( './tools/help_functions.js' );
        let ViewHandler = require( './view_handler.js' );
        let ImageController = require( './handlers/imageController.js' );
        let syncScroll = require( './tools/sync_scroll.js' );
        let LocationListModule = require( './layoutLayer/locationListLayout.js' );
        let EventCalenderModule = require( './layoutLayer/eventCalenderLayout.js' );

        if ( typeof term === 'undefined' ) { term = this.settings.keyword; }

        if ( term === '' ) {
            FrontPageModule.generate_front_page();
            return;
        }
        
        // Categroies
        var resp = [];
        var categories = LocationCategoryModule.settings.location_categories;
        for ( var i = 0; i < categories.length; i++ ) {
            if ( categories[i].category_name.toLowerCase().includes( term.toLowerCase() ) ) {
                resp.push( [ 1, categories[i] ] );
            }
        }

        categories = resp;
        categories.sort(function( a, b ) {
            if ( a[0] < b[0] ) return -1;
            if ( a[0] > b[0] ) return 1;
            return 0;
        });
        
        // Locations
        var resp = [];
        var locations = LocationModule.settings.locations;
        locations.forEach(function( item, index ) {
            if ( item.title.toLowerCase().includes( term.toLowerCase() ) ) {
                resp.push( item ); }
        }); locations = resp;

        // Checks if events have been loaded in
        var resp = [];
        var events = EventContentModule.settings.events;

        // Loops through all events and assigns them a fitness score
        for ( var i = 0; i < events.length; i++ ) {
            var fitness = 0, tTitle = 0, tDesc = 0, tParent = 0;
            var keywords = term.split(' ');
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
        
        if ( events.length === 0 && categories.length === 0 && locations.length === 0 ) {
            $('.eventscontainer').html('<div class="error">Ingen resultater fundet</div>');
        } else {

            // Generates categories html
            var response = '<div class="search-container">'; 
            
            if ( categories.length > 0 ) {
                response += '<div class="search-category-container white">Sted kategorier:<div class="breakline"></div>';
                response += '<div class="flex">';
                for ( var iter = 0; iter < categories.length; iter++ ) {
                    response += LocationCategoryModule.generate_category_html( categories[i][1] );
                } response += '</div></div>';
            }
            
            if ( locations.length > 0 ) {
                response += '<div class="search-category-container">Steder:<div class="breakline"></div>';
                response += '<div class="unflex">';
                
                locations.forEach(function( item, index ) {
                    console.log( item );
                    response += LocationListModule.generateLocationElemHtml( item );
                }); 
                
                response += '</div>';
                response += '</div>';
            }

            if ( events.length > 0 ) {
            
                // Generates event html
                response += '<div class="search-category-container white">Begivenheder:<div class="breakline"></div>';
                response += '<div class="flex">';
                for ( var iter = 0; iter < events.length; iter++ ) {
                    response += EventCalenderModule.generateEventHtml( events[iter] ); 
                } response += '</div>';
            
            }

            // Render the html
            $('.eventscontainer').html( response+='</div></div>' );

        }

        ViewHandler.closeSingleView();
        setTimeout(function() {
            $('html,body').animate({scrollTop : $('#page-content').offset().top},200);
            ImageController.lazyLoad();
            syncScroll.rescaleContainer();
        }, 50);
        
    },
    
}; module.exports = SearchModule;




