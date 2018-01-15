

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

    /* ---- Fetching events ---- */
    case "EVENTS_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Events fetched ---- */
    case "EVENTS_FETCHED": {

      // Extracts data
      let ap_city  = action.payload.city
      let ap_elems = action.payload.elements;
      let ap_acc   = action.payload.accuracy;

      // Error handling
      if ( ap_elems == null || ap_city == null ) {
        return Object.assign({}, state, {
          fetching : false,
        });
      }

      // Formats action payload elements
      let elements = { };
      for ( let n = 0; n < ap_elems.length; n++ ) {

        // Sets elements
        elements[ap_elems[n].id] = ap_elems[n];
        let element = elements[ap_elems[n].id];

        // Slices off non functional part of the start time string
        if ( element.start_time != null && element.start_time.length > 0 ) {
          element.start_time = element.start_time.slice(0,19);
        }

        // Slices off non functional part of the start time string
        if ( element.end_time != null && element.end_time.length > 0 ) {
          element.end_time = element.end_time.slice(0,19);
        }

      }

      // Checks current city
      let cur_city = state.data[ap_city];
      let new_city = { };

      // If city has already been set
      if ( cur_city != null ) {

        // Generates new elements object
        let cur_elements = cur_city.elements;
        let new_elements = Object.assign({}, cur_elements, elements);

        // Sets new city
        new_city['elements'] = new_elements;

      } else {

        // Sets new city
        new_city['elements'] = elements;

      }

      // Sets all future fetched
      if ( ap_acc != null ) {
        new_city['all_future_fetched'] = ( ap_acc != null && ap_acc >= 1 ) ? false : true;
      }

      // Sets new data
      let cur_data = state.data; let ow_data = {}; ow_data[ap_city] = new_city;
      let new_data = Object.assign({}, cur_data, ow_data);

      // Sets state
      return Object.assign({}, state, {
        fetching : false,
        fetched  : true,
        data     : new_data
      });

      // Extracts data
      // let ap_city = action.payload.city;
      // let ap_elements = action.payload.elements;
      //
      // // Error handling
      // if ( ap_elements == null || ap_elements.length <= 0 || ap_city == null ) {
      //   return state; }
      //
      //
      // // Formats data
      // let formatteddata = { };
      // for ( let n = 0; n < ap_elements.length; n++ ) {
      //
      //   formatteddata[ap_elements[n].id] = ap_elements[n];
      //   let elem = formatteddata[ap_elements[n].id];
      //
      //   // Removes not functional part of time strings,
      //   // for start time
      //   if ( elem.start_time != null ) {
      //     elem.start_time = elem.start_time.slice(0,19);
      //   }
      //
      //   // and for end time
      //   if ( elem.end_time != null ) {
      //     elem.end_time = elem.end_time.slice(0,19);
      //   }
      //
      // }
      //
      //
      // // Combines the formatted data with previous state,
      // // if previous state is found
      // let resp = { };
      // if ( state.data[city] != null ) {
      //   resp = Object.assign( {}, state.data[city].elements, formatteddata );
      // } else { resp = formatteddata; }
      //
      //
      // // Gets future count for new 'resp' field
      // let future_count = ( Object.keys(resp).filter(( id ) => {
      //
      //   // Extracts data
      //   let event = resp[id],
      //     event_time = event.end_time!=null?event.end_time:event.start_time,
      //     event_date = new Date(event_time);
      //
      //   // Returns
      //   return (new Date()).getTime() < event_date.getTime();
      //
      // })).length;
      //
      //
      // // Formats data based on city
      // // New city if none is found
      // let city = { };
      // if ( state.data[ap_city] == null ) {
      //   city = { elements : resp };
      // }
      //
      // // Creates city data if found
      // else {
      //   let elements = Object.assign({}, state.data[ap_city].elements, resp);
      //   city = Object.assign({}, state.data[ap_city], { elements });
      // }
      //
      // // Sets data
      // let new_data = { }; new_data[ap_city] = city;
      // let data = Object.assign({}, state.data, new_data);
      //
      //
      // // New State
      // let new_state = (Object.assign({}, state, {
      //   fetching : false,
      //   fetched  : true,
      //   data,
      //   future_count,
      // }));
      //
      // // All future fetched?
      // if ( action.payload.future && action.payload.accuracy<1 ) {
      //   new_state.all_future_fetched = true;
      // }
      //
      // // Returns
      // return new_state;

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default EventsReducer;
