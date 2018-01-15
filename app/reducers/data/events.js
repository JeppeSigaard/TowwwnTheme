

// Preloaded state
const initState = {

  fetching : false,
  fetched  : false,
  elements : { },

  future_count : 0,
  all_future_fetched : false,

};

// Events reducer
const EventsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Fetching events ---- */
    case "EVENTS_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Events fetched ---- */
    case "EVENTS_FETCHED": {

      // Error handling
      if ( action.payload.elements == null ||
           action.payload.elements.length <= 0 ) { return state; }

      // Formats data
      let formatteddata = { };
      for ( let n = 0; n < action.payload.elements.length; n++ ) {

        formatteddata[action.payload.elements[n].id] = action.payload.elements[n];
        let elem = formatteddata[action.payload.elements[n].id];

        // Removes not functional part of time strings,
        // for start time
        if ( elem.start_time != null ) {
          elem.start_time = elem.start_time.slice(0,19);
        }

        // and for end time
        if ( elem.end_time != null ) {
          elem.end_time = elem.end_time.slice(0,19);
        }

      }

      // Combines the formatted data with previous state
      let resp = Object.assign( state.elements, formatteddata );

      // Gets future count
      let future_count = ( Object.keys(resp).filter(( id ) => {

        // Extracts data
        let event = state.elements[id],
          event_time = event.end_time!=null?event.end_time:event.start_time,
          event_date = new Date(event_time);

        // Returns
        return (new Date()).getTime() < event_date.getTime();

      })).length;

      // New State
      let new_state = (Object.assign({}, state, {
        fetching : false,
        fetched  : true,
        elements : resp,
        future_count,
      }));

      // All future fetched?
      if ( action.payload.future && action.payload.accuracy<1 ) {
        new_state.all_future_fetched = true;
      }

      // Returns
      return new_state;

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default EventsReducer;
