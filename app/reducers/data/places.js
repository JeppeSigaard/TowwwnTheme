

// Init state
const initState = {
  fetching : false,
  fetched  : false,
  elements : { }
};

// Places Reducer
const PlacesReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Places fetching ---- */
    case "PLACES_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Places fetched ---- */
    case "PLACES_FETCHED": {

      // Error handling
      if ( action.payload.elements == null ||
           action.payload.elements.length <= 0 ) { return state; }

      // Formats data
      let formatteddata = { };
      for ( let n = 0; n < action.payload.elements.length; n++ ) {
        formatteddata[action.payload.elements[n].id] = action.payload.elements[n];
      }

      // Combines the formatted data with previous state
      let resp = Object.assign( state.elements, formatteddata );

      // Returns
      return Object.assign({}, state, {
        fetching : false,
        fetched  : true,
        elements : resp,
      });

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default PlacesReducer;
