
var LocationSingleViewModule = {
    
    // Settings
    settings: {},
    
    // Init
    init: function() {

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
        
        $.get( rest_api+'events?parent='+obj.id, {}, function( data ) {
            
            // Generates html
            var html = '<div class="location-singleview-bar">'+ obj.name +'<div class="close-button">&times;</div></div>';
            html += '<div class="location-singleview-content">';

            // Event slider
            html += '<div class="event-slider" >';
            html += '<div class="prevButton button"></div>';
            html += '<div class="nextButton button"></div>';
            html += '<div class="inner" style="width:'+(data.length/3*100)+'%;">';

            // All events
            if ( data.length > 0 ) {
                data.forEach(function( item, index ) {
                    
                    html += '<div class="item" style="width:'+(100/data.length)+'%;">';
                    html += EventCalenderModule.generateEventHtml( item );
                    html += '</div>';
                    
                    /*html += '<div class="item" style="width:'+(100/data.length)+'%;">';
                    html += '<div class="imgcontainer" style="background-image:url('+item.imgurl+')"></div>';
                    html += '<div class="textcontainer">';
                    html += '<p class="location-sv-title">'+item.title+'</p>';
                    html += '</div>';
                    html += '</div>';*/
                });
            }

            html += '</div>';
            html += '</div>';

            // Imgs
            // html += '<div class="imgcontainer" style="background-image:url('+obj.picture+')"></div>';

            html += '</div>';

            // Renders the html
            ViewHandler.settings.location_singleview.html( html );
            $('.event-slider').smamo_slider({
                'prevButton' : '.prevButton',
                'nextButton' : '.nextButton',
            });
            
        });
    },
    
    // Generate location singleview html
    generateHtml: function() {
        // Do stuff
    },
    
};
