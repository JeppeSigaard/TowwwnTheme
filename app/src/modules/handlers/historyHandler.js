const _ = require( '../libaries/underscore/underscore_main.js' ),
      Globals = require( '../../app/globals.js' ),
      typeslugs = {
          event : 'event',
          location : 'location',
          category : 'category',
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

        console.log(obj);
        const path = (obj.type == 'home') ? app_data.main_path + '/' : app_data.main_path + '/' + typeslugs[obj.type] + '/' + obj.slug + '/';
        history.pushState(obj, obj.name, path );
    }

    // handles pop state
    pop( event ){

        // To events
        if(event.state.type == 'event'){
            Globals.setMainState({'singleevent' : event.state});
            Globals.viewHandler.changeViewFocus(_('#event-single-view'), _('#event-calendar-view'), true, false, false);
        }

        // To locations
        else if(event.state.type == 'location'){
            Globals.setMainState({'singleLocation' : event.state});
        }

        // Home
        else if(event.state.type == 'home'){
            Globals.setMainState({
                'singleLocation' : null,
                'singleevent' : null,
            });
        }

    }

} module.exports = historyHandler;
