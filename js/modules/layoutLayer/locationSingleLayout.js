
var LocationSingleViewModule = {
    
    // Settings
    settings: {},
    
    // Init
    init: function() {
        
        // Opens new single view
        $(document).on('click', '.location-container', function() {
            var container = $(this), id = container.attr('id');

            container.addClass('loading');

            $.get(rest_api + 'locations/' + id, function(data){
                var location = data[0];

                history.pushState({type : 'location', id : location.id}, location.name, main_path + '/sted/' + location.slug);

                LocationSingleViewModule.renderSingleView( location );
                ViewHandler.change_view_focus( 4 );

                container.removeClass('loading');
            });


        });
        
        // Closes single view
        $(document).on('click', '.location-singleview-bar .close-button', function () {
            ViewHandler.change_view_focus( 3, false, true );
            setTimeout(function() {
                ViewHandler.settings.location_singleview.html( '' );
            }, 400);
        });
        
    },
    
    // Render location single view
    renderSingleView: function( obj ) {
        
        // Generates html
        var html = '<div class="location-singleview-bar"><div class="close-button">&times;</div></div>';
        html += '<div class="location-singleview-content">';

        html += '<h1>'+ obj.name +'</h1>';

        html += '</div>';


        
        // Renders the html
        ViewHandler.settings.location_singleview.html( html );
        
    },
    
    // Generate location singleview html
    generateHtml: function() {
        // Do stuff
    },
    
};
