var NavigationHandler = {

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

    spoopy : function(elem, add){
        if(!elem.hasClass('spoopy') && add !== false){
            elem.addClass('spoopy');
        }
        else{
            elem.addClass('spoopy-out');
            setTimeout(function(){
                elem.removeClass('spoopy spoopy-out');
            },300);
        }
    },

    dataTypeId : function(elem,type,id){
        let ViewHandler = require( './../view_handler.js' );
        let EventSingleModule = require( './../layoutLayer/eventSingleLayout.js' );
        let LocationListModule = require( './../layoutLayer/locationListLayout.js' );
        let LocationSingleViewModule = require( './../layoutLayer/locationSingleLayout.js' );

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
            this.spoopy(ViewHandler.settings.event_singleview_outer);

            ViewHandler.change_view_focus( 0 );
            ViewHandler.settings.event_calender_outer.addClass('normalize');
            ViewHandler.settings.location_categories_outer.addClass('normalize');
            $.get(rest_api + 'events/' + id, function(data){

                if(typeof data[0] === 'undefined'){ return; }

                history.pushState({type : 'event', id : data[0].id}, data[0].name, main_path + '/begivenhed/' + data[0].slug);

                EventSingleModule.render_sv_event(data[0], function(){
                    $('.imgcontainer', elem).removeClass('loadingsv');
                    this.spoopy(ViewHandler.settings.event_singleview_outer, false);
                }.bind(this));
            }.bind(this));

        }

        // Category list
        if ('category' === type){

            if ( !elem.hasClass('selected') ) $('.category-container .selected').removeClass('selected');
            elem.addClass('loadingsv');

            ViewHandler.change_view_focus( 3 );
            ViewHandler.settings.event_calender_outer.addClass('normalize');
            ViewHandler.settings.location_categories_outer.addClass('normalize');
            this.spoopy(ViewHandler.settings.location_listview_outer);

            $.get(rest_api + 'categories/' + id, function( data ){

                elem.addClass('selected');

                if(typeof data === 'undefined'){ return; }

                this.spoopy(ViewHandler.settings.location_listview_outer, false);
                history.pushState({type : 'category', id : data.category_id}, data.category_name, main_path + '/kategori/' + data.category_slug);

                LocationListModule.renderLocationList(data,function(){
                    elem.removeClass('loadingsv');
                });


            }.bind(this));
        }

        // Location
        if ('location' === type){

            elem.addClass('loading');

            ViewHandler.change_view_focus( 4 );
            this.spoopy(ViewHandler.settings.location_singleview_outer);
            $.get(rest_api + 'locations/' + id, function( data ){

                if(typeof data[0] === 'undefined'){ return; }

                var location = data[0];

                this.spoopy(ViewHandler.settings.location_singleview_outer, false);
                history.pushState({type : 'location', id : location.id}, location.name, main_path + '/sted/' + location.slug);

                LocationSingleViewModule.renderSingleView( location );


                elem.removeClass('loading');

            }.bind(this));
        }

    },

}; module.exports = NavigationHandler;
