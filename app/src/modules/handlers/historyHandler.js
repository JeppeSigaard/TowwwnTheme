const _ = require( '../libaries/underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' ),
      typeslugs = {
          event : 'event',
          location : 'location',
          category : 'category',
          main_title : 'Towwwn',
      };

class historyHandler {

    constructor( obj ) {

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        window.onpopstate = function(event){
            this.pop(event);
        }.bind(this);
    }

    // Replace the current history state
    replace( obj ){
        const path = (obj.type == 'home') ? app_data.main_path + '/' : app_data.main_path + '/' + typeslugs[obj.type] + '/' + obj.slug + '/';
        history.replaceState(obj, obj.name, path );
    }

    // Add new history state
    push( obj ){

        // Return if not new
        if(obj.id != null && history.state.id != null && history.state.id === obj.id) return;
        if(obj.category_id != null && history.state.category_id != null && history.state.category_id === obj.category_id) return;

        const objName = (obj.type == 'category') ? obj.category_name + ' · Kategorier' : obj.name;

        const path = (obj.type == 'home') ? app_data.main_path + '/' : app_data.main_path + '/' + typeslugs[obj.type] + '/' + obj.slug + '/';

        history.pushState(obj, objName, path );

        // Google analytics send pageview
        if(typeof ga == 'function'){
            ga('send', 'pageview', path);
        }

        // Set title
        document.title = (obj.type == 'home') ? objName : objName + ' · ' + typeslugs.main_title ;
    }

    // handles pop state
    pop( event ){

        if(event.state == null) return;

        const eventName = (event.state.type == 'category') ? event.state.category_name + ' · Kategorier' : event.state.name;

        // To events
        if(event.state.type == 'event'){
            Globals.viewHandler.changeViewFocus('#event-single-view', '#event-calendar-view', true, true, true);
            Globals.setMainState({'singleevent' : event.state});
        }

        // To locations
        else if(event.state.type == 'location'){
            Globals.viewHandler.changeViewFocus('#location-list-view', '#location-single-view', true, true, true);
            Globals.setMainState({'singleLocation' : event.state});

            Globals.locationDataHandler.getCategorySpecificLocation( event.state.categories[0].category_id ).then(( resp ) => {
                Globals.setMainState({
                    'currentLocationsCategory' : event.state.categories[0],
                    'currentLocations' : resp,
                });
            });

        }

        // To category
        else if(event.state.type == 'category'){
            Globals.viewHandler.changeViewFocus('#location-category-view', '#location-list-view', true, true, true);
            Globals.locationDataHandler.getCategorySpecificLocation( event.state.category_id ).then(( resp ) => {
                Globals.setMainState({
                    'currentLocationsCategory' : event.state,
                    'currentLocations' : resp,
                });
            });
        }


        // Home
        else if(event.state.type == 'home'){
            Globals.viewHandler.changeViewFocus('#event-calendar-view', '#location-category-view', true, true, true);
            Globals.setMainState({
                'singleLocation' : null,
                'singleevent' : null,
            });
        }

        // Google analytics send pageview
        if(typeof ga == 'function'){
            ga('send', 'pageview', event.state.path);
        }

        // Set title
        document.title = (event.state.type == 'home') ? eventName : eventName + ' · ' + typeslugs.main_title ;
    }

} module.exports = historyHandler;
