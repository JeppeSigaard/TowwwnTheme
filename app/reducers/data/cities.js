

// Init state
const initState = {
  fetching : false,
  fetched : false,
  data : { },
};

// Cities Reducer
const citiesReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Fetching ---- */
    case "CITIES_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Fetched ---- */
    case "CITIES_FETCHED": {

      // Extracts data n' makes some error handling
      let elements = action.payload.elements;
      if ( elements == null ) { return state; }

      // Response
      let response = { };
      for ( let n = 0; n < elements.length; n++ ) {
        response[elements[n]['term_id']] = elements[n];
      }

      // Sets data state
      let data = Object.assign({}, state.data, {
        elements : response
      });

      // Returns
      return Object.assign({}, state, {
        data, fetching : false, fetched : true,
      });

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default citiesReducer;
