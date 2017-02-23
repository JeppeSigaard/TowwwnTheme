var navigationHandler = {

    settings : {},

    bindUIActions : function(){

        $(document).on('click', '[data-id][data-type]', function( e ){
            var elem = $(e.currentTarget),
                type = elem.attr('data-type'),
                id = elem.attr('data-id');

            e.preventDefault();

            this.dataTypeId(elem,type,id);
        }.bind(this));
    },

    init : function(){
        this.bindUIActions();
    },


    dataTypeId : function(elem,type,id){

        // home
        if('home' === type){
            ViewHandler.change_view_focus( ViewHandler.settings.centered_view );
        }

        // calendar
        if('calendar' === type){
            ViewHandler.change_view_focus( 1, true, false );
        }

        // calendar
        if('categories' === type){
            ViewHandler.change_view_focus( 2, false, true );
        }

        // Events
        if ('event' === type){

            $('.imgcontainer', elem).addClass('loadingsv');
            ViewHandler.settings.event_singleview_outer.addClass('spoopy');

            $.get(rest_api + 'events/' + id, function(data){

                if(typeof data[0] === 'undefined'){ return; }

                 history.pushState({type : 'event', id : data[0].id}, data[0].name, main_path + '/begivenhed/' + data[0].slug);

                EventSingleModule.render_sv_event(data[0], function(){
                    $('.imgcontainer', elem).removeClass('loadingsv');
                    ViewHandler.change_view_focus( 0 );
                    ViewHandler.settings.event_calender_outer.addClass('normalize');
                    ViewHandler.settings.location_categories_outer.addClass('normalize');
                    ViewHandler.settings.event_singleview_outer.removeClass('spoopy');
                });



            });

        }

        // Category list
        if ('category' === type){

            elem.addClass('loadingsv');

            $.get(rest_api + 'categories/' + id, function( data ){

                if(typeof data === 'undefined'){ return; }

                history.pushState({type : 'category', id : data.category_id}, data.category_name, main_path + '/kategori/' + data.category_slug);

                LocationListModule.renderLocationList(data,function(){
                    elem.removeClass('loadingsv');
                    ViewHandler.settings.event_calender_outer.addClass('normalize');
                    ViewHandler.settings.location_categories_outer.addClass('normalize');
                    ViewHandler.change_view_focus( 3 );
                });


            });
        }

        // Location
        if ('location' === type){

            elem.addClass('loading');

            $.get(rest_api + 'locations/' + id, function( data ){

                if(typeof data[0] === 'undefined'){ return; }

                var location = data[0];

                history.pushState({type : 'location', id : location.id}, location.name, main_path + '/sted/' + location.slug);

                LocationSingleViewModule.renderSingleView( location );
                ViewHandler.change_view_focus( 4 );

                elem.removeClass('loading');

            });
        }

    }

};
