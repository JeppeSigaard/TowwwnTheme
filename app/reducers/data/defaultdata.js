

// Init state
const initState = {
  fetching : false,
  fetched : false,
  data : { },
};

// Reducer
const defaultDataReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Set city ---- */
    case "CONFIG_SET_CITY": {
      return Object.assign({}, state, {
        fetched : false,
      });
    }

    /* ---- Fetching ---- */
    case "DEFAULT_DATA_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Fetched ---- */
    case "DEFAULT_DATA_FETCHED": {

      // Error handling
      if ( action.payload.data == null ||
           action.payload.data.constructor.name !== 'Object' )
           { return state; }

      // Extracts data
      const data = Object.assign({}, state.data, action.payload.data);

      // Sets state
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
export default defaultDataReducer;
