

// Init state
const initState = {
  fetching : false,
  fetched  : false,
  elements : [ ],
};

// Advertisements reducer
const advertisementsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Commercials fetching ---- */
    case "COMMERCIALS_FETCHING": {
      return Object.assign({}, state, {
        fetching : true,
      });
    }

    /* ---- Commercials fetched --- */
    case "COMMERCIALS_FETCHED": {

      // Error handling
      if ( action.payload.elements == null ) { return state; }

      // Returns
      return Object.assign({}, state, {
        elements : action.payload.elements,
        fetching : false,
        fetched  : true,
      });

    }

    /* ---- Default case ---- */
    default: { return state; }

  }
});

// Exports
export default advertisementsReducer;
