
var LocationListModule = {
    
    // Settings
    settings: { },
    
    // Init
    init: function() { 
        
        // Opens location list view
        $(document).on( 'click', '.category', function() {
            LocationListModule.renderLocationList( $(this) );
            ViewHandler.settings.event_calender_outer.addClass('normalize');
            ViewHandler.settings.location_categories_outer.addClass('normalize');
            ViewHandler.change_view_focus( 3 );
        });
        
        // Closes location list view
        $(document).on( 'click', '.locationlist-bar .close-button', function() {
            ViewHandler.change_view_focus( 2, false, true );
            ViewHandler.settings.event_calender_outer.removeClass('normalize');
            ViewHandler.settings.location_categories_outer.removeClass('normalize');
            
            setTimeout(function() {
                ViewHandler.settings.location_listview.html('');
            }, 400);
        });
        
    },
    
    // Render Locatiions
    renderLocationList: function( categoryDomElem ) {
        
        // Gets elem
        elem = LocationCategoryModule.settings.sorted_location_categories[ parseInt( categoryDomElem.attr('id') ) ];
        
        // Generates top bar
        var html = '<div class="locationlist-bar">'+elem.category_name+'<div class="close-button">&times;</div></div>';
        html += '<div class="locations-container" >';
        for ( var iter = 0; iter < elem.category_locations.length; iter++ ) {
            html += this.generateLocationElemHtml( elem.category_locations[ iter ] ); }
        html += '</div>';
        
        // Renders the html
        ViewHandler.settings.location_listview.html( html );
        
    },
    
    // Generate Location List Html
    generateLocationElemHtml: function( location ) {
        var response = '<div class="location-container">';
        response += '<div class="location-title"><h1>'+location.name+'</h1></div>'
        return response += '</div>';
    },
    
};