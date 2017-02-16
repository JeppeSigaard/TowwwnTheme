
var LocationSingleViewModule = {
    
    // Settings
    settings: {},
    
    // Init
    init: function() {
        
        // Opens new single view
        $(document).on('click', '.location-container', function() {
            LocationSingleViewModule.renderSingleView( $(this) );
            ViewHandler.change_view_focus( 4 );
        });
        
        // Closes single view
        $(document).on('click', '.location-singleview-bar .close-button', function () {
            ViewHandler.change_view_focus( [ 2, 3 ] );
            setTimeout(function() {
                ViewHandler.settings.location_singleview.html( '' );
            }, 400);
        });
        
    },
    
    // Render location single view
    renderSingleView: function( elem ) {
        
        // Generates html
        var html = '<div class="location-singleview-bar"><div class="close-button">&times;</div></div>';
        html += '<div class="location-singleview-content"></div>';
        
        // Renders the html
        ViewHandler.settings.location_singleview.html( html );
        
    },
    
    // Generate location singleview html
    generateHtml: function() {
        // Do stuff
    },
    
};