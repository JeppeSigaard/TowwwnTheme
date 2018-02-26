

// Initial state
const initState = {

  shown_single_event : null,
  shown_category : null,
  shown_single_place : null,

};

// Shown Elements Reducer
const shownElementsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

  // Set shown single event
  case 'SET_SHOWN_SINGLE_EVENT' : {

    // Error handling
    if ( action.payload.id == null )
    { return state; }

    // Return state
    return Object.assign({}, state, {
      shown_single_event : action.payload.id
    });

  }

  /// Set shown category
  case 'SET_SHOWN_CATEGORY' : {

    // Error handling
    if ( action.payload.id == null )
    { return state; }

    // Return state
    return Object.assign({}, state, {
      shown_category : action.payload.id
    });

  }

  /// Set shown single place
  case 'SET_SHOWN_SINGLE_PLACE' : {

    // Error handling
    if ( action.payload.id == null )
    { return state; }

    // Return state
    return Object.assign({}, state, {
      shown_single_place : action.payload.id
    });

  }

  // Default case
  default: { return state; }

  }
});

// Exports
export default shownElementsReducer;