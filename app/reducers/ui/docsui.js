

// Initial state
const initState = {
  visible : false,
};

// Docs UI Reducer
const docsUiReducer = (( state=initState, action ) => {
  switch ( action.type ) {

  // Set docs visible
  case 'SET_DOCS_VISIBLE' : {

    // Response
    let response = { };

    // Extracts data
    if ( action.payload.index != null ) {
      response.index = action.payload.index;
    }

    if ( action.payload.visible != null ) {
      response.visible = action.payload.visible;
    }

    // Returns
    return Object.assign ( {}, state, response );

  }

  // Default case
  default : { return state; }

  }
});

// Exports
export default docsUiReducer;