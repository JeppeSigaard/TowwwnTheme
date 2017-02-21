
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
            history.pushState({type : 'home', id : null}, 'Towwwwn', main_path );
            ViewHandler.change_view_focus( 2, false, true );

            ViewHandler.settings.event_calender_outer.removeClass('normalize');
            ViewHandler.settings.location_categories_outer.removeClass('normalize');
        });
        
        // Animates ripple
        $(document).on( 'click', '.location-container', function( e ) {
            
            // Removes bookmark mode for other elems
            $('.bookmark-mode').removeClass('bookmark-mode');
            $('.location-list .filled .ripple').addClass('animateBack');
            $('.location-list .filled .ripple').css({
                'top' : ( $(this).parent().innerHeight() / 2 - $(this).outerHeight() / 2 ) + 'px',
                'left' : ( $(this).parent().innerWidth() / 2 - $(this).outerWidth() / 2 ) + 'px',
            });
            $('.filled').removeClass('filled');
            
            // Adds & animates bookmark mode for clicked elem
            $(this).addClass('bookmark-mode');
            $('.ripple', this).addClass('animate');
            $('.ripple', this).css({
                'top': ( e.pageY - $(this).offset().top - $('.ripple', this).outerHeight() / 2 ) + 'px',
                'left': ( e.pageX - $(this).offset().left - $('.ripple', this).outerWidth() / 2 ) + 'px',
            });
            
            // Stuff when trans is done
            setTimeout(function() {
                $('.animateBack').removeClass('animateBack');
                $('.animate').removeClass('animate');
                $(this).addClass('filled');
            }.bind(this), 300);
            
        });
        
    },
    
    // Render Locatiions
    renderLocationList: function( id, cb ) {

        $('#'+id).addClass('loadingsv');
        
        $.get(rest_api + 'categories/' + id, function(data){

            var html = '<div class="locationlist-bar">'+data.category_name+'<div class="close-button">&times;</div></div>';
            html += '<div class="location-list" id="'+data.category_id+'" data-slug="'+data.category_slug+'">';

            for (var i in data.locations){
                html += this.generateLocationElemHtml( data.locations[i]);
            }

            html += '</div>';

            // Renders the html
            ViewHandler.settings.location_listview.html( html );
            $('#'+id).removeClass('loadingsv');

            if(typeof cb === 'function'){
                cb(data);
            }

        }.bind(this));
    },
    
    // Generate Location List Html
    generateLocationElemHtml: function( location ) {
        var response = '<a href="#" class="location-container" id="'+location.id+'">',
            about = typeof location.about !== 'undefined' && location.about !== null ? location.about : '';
        
        response += '<span class="ripple"></span>';
        response += '<span class="location-picture" style="background-image:url('+location.picture+');"></span>';
        response += '<span class="location-description"><h2 class="location-title">'+location.name+'</h2>';
        response += '<p class="location-about">'+about+'</p></span>';


        return response += '</a>';
    },
    
};
