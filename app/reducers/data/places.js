

// Init state
const initState = {
  fetching : false,
  fetched  : false,
  data : { }, // data: { svendborg(2): { 2:{...}, 4:{...} } }
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

      // Extracts data
      let ap_city = action.payload.city;
      let ap_elements = action.payload.elements;

      // Error handling
      if ( ap_elements == null || ap_elements <= 0 ) {
        return state; }


      // Formats data
      let formatteddata = { };
      for ( let n = 0; n < ap_elements.length; n++ ) {
        formatteddata[ap_elements[n].id] = ap_elements[n];
      }


      // Sets city part of data
      let city = { };
      let new_data = { };

      // If city doesn't already exists
      if ( state.data[ap_city] == null ) {
        city = { elements : formatteddata };
        new_data[ap_city] = city;
      }

      // If city already exists
      else {
        city = Object.assign({}, state.data[ap_city].elements, formatteddata);
        new_data[ap_city] = Object.assign({}, state.data[ap_city], {elements:city});
      }

      // Sets data part of.. data?
      let data = Object.assign({}, state.data, new_data);


      // Returns
      return Object.assign({}, state, {
        fetching : false,
        fetched  : true,
        data,
      });

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default PlacesReducer;
