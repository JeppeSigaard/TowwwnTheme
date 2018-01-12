

// Preloaded state
const initState = {
  fetching : false,
  fetched  : false,
  data : { }, // data: { svendborg(2): { elements: { 2: {...}, 4: {...} } } }

  future_count : 0,
  all_future_fetched : false,

};

// Events reducer
const EventsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Set city ---- */
    case "CONFIG_SET_CITY": {
      return Object.assign({}, state, {
        fetched : false,
      });
    }

    /* ---- Fetching events ---- */
    case "EVENTS_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Events fetched ---- */
    case "EVENTS_FETCHED": {

      // Extracts data
      let ap_city = action.payload.city;
      let ap_elements = action.payload.elements;

      // Error handling
      if ( ap_elements == null || ap_elements.length <= 0 || ap_city == null ) {
        return state; }


      // Formats data
      let formatteddata = { };
      for ( let n = 0; n < ap_elements.length; n++ ) {

        formatteddata[ap_elements[n].id] = ap_elements[n];
        let elem = formatteddata[ap_elements[n].id];

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


      // Combines the formatted data with previous state,
      // if previous state is found
      let resp = { };
      if ( state.data[city] != null ) {
        resp = Object.assign( {}, state.data[city].elements, formatteddata );
      } else { resp = formatteddata; }


      // Gets future count for new 'resp' field
      let future_count = ( Object.keys(resp).filter(( id ) => {

        // Extracts data
        let event = resp[id],
          event_time = event.end_time!=null?event.end_time:event.start_time,
          event_date = new Date(event_time);

        // Returns
        return (new Date()).getTime() < event_date.getTime();

      })).length;


      // Formats data based on city
      // New city if none is found
      let city = { };
      if ( state.data[ap_city] == null ) {
        city = { elements : resp };
      }

      // Creates city data if found
      else {
        let elements = Object.assign({}, state.data[ap_city].elements, resp);
        city = Object.assign({}, state.data[ap_city], { elements });
      }

      // Sets data
      let new_data = { }; new_data[ap_city] = city;
      let data = Object.assign({}, state.data, new_data);


      // New State
      let new_state = (Object.assign({}, state, {
        fetching : false,
        fetched  : true,
        data,
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
