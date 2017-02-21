var historyModule = {

    settings : {},

    bindUIActions : function(){

        // When browser history changes
        window.onpopstate = function(event) {
            if (null === event.state || 'home' == event.state.type){
                // Go to front page mby?
                ViewHandler.change_view_focus( 1, true );
            }

            else if(event.state.type && 'event' == event.state.type){
                ViewHandler.settings.event_singleview_outer.addClass('spoopy');
                EventSingleModule.render_sv_event( event.state.id, function() {

                    ViewHandler.change_view_focus( 0 );
                    ViewHandler.settings.event_calender_outer.addClass( 'normalize' );
                    ViewHandler.settings.location_categories_outer.addClass( 'normalize' );
                }, $(this));

                EventSingleModule.bindUIActions();

                ViewHandler.toggle_poly_view( true );

            }

            else if(event.state.type && 'category' == event.state.type){

                ViewHandler.change_view_focus( 2, true );

                LocationListModule.renderLocationList( event.state.id, function(data){

                    ViewHandler.settings.event_calender_outer.addClass('normalize');
                    ViewHandler.settings.location_categories_outer.addClass('normalize');


                });

            }

            else if(event.state.type && 'location' == event.state.type){

                $('#'+ event.state.id).addClass('loading');

                $.get(rest_api + 'locations/' + event.state.id, function(data){
                    var location = data[0];

                    LocationSingleViewModule.renderSingleView( location );
                    ViewHandler.change_view_focus( 4 );

                    $('#'+ event.state.id).removeClass('loading');
                });

            }
        };

    },

    init : function(){

        // Iitial replacement of loading state
        // history.replaceState({ obj }, "page name", "");

        this.bindUIActions();
    },

};

historyModule.init();
