
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
            var list = $('.location-list');

            if(list.length){
                history.pushState({type : 'category', id : list.attr('id')}, 'Towwwwn', main_path + '/kategori/' + list.attr('data-slug'));
            }

            ViewHandler.change_view_focus( 3, false, true );
        });
    },
    
    // Render location single view
    renderSingleView: function( obj ) {

        // Generates html
        var html = '<div class="location-singleview-bar">'+ obj.name +'<div class="close-button">&times;</div></div>';
        html += '<div class="location-singleview-content">';
        
        html += '<div class="imgcontainer" style="background-image:url('+obj.picture+')"></div>';
        
        html += '</div>';

        // Renders the html
        ViewHandler.settings.location_singleview.html( html );
        
    },
    
    // Generate location singleview html
    generateHtml: function() {
        // Do stuff
    },
    
};
