
var LocationListModule = {
    
    // Settings
    settings: { },
    
    // Init
    init: function() { 
        
        // Opens location list view
        $(document).on( 'click', '.category', function() {
            LocationListModule.renderLocationList( $(this).attr('id'),function(data){

                history.pushState({type : 'category', id : data.category_id}, data.category_name, main_path + '/kategori/' + data.category_slug);

                ViewHandler.settings.event_calender_outer.addClass('normalize');
                ViewHandler.settings.location_categories_outer.addClass('normalize');
                ViewHandler.change_view_focus( 3 );

            });
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
    renderLocationList: function( id, cb ) {

        $('#'+id).addClass('loading');
        
        $.get(rest_api + 'categories/' + id, function(data){

            var html = '<div class="locationlist-bar">'+data.category_name+'<div class="close-button">&times;</div></div>';
            html += '<div class="location-list" >';

            for (var i in data.locations){
                html += this.generateLocationElemHtml( data.locations[i]);
            }

            html += '</div>';

            // Renders the html
            ViewHandler.settings.location_listview.html( html );
            $('#'+id).removeClass('loading');

            if(typeof cb === 'function'){
                cb(data);
            }

        }.bind(this));
    },
    
    // Generate Location List Html
    generateLocationElemHtml: function( location ) {
        var response = '<a href="#" class="location-container" id="'+location.id+'">',
            about = typeof location.about !== 'undefined' ? location.about : '';

        response += '<span class="location-picture" style="background-image:url('+location.picture+');"></span>';
        response += '<span class="location-description"><h2 class="location-title">'+location.name+'</h2>';
        response += '<p class="location-about">'+about+'</p></span>';


        return response += '</a>';
    },
    
};
