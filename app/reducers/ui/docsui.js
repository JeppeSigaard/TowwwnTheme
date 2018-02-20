

// Initial state
const initState = {
  visible : false,
};

// Docs UI Reducer
const docsUiReducer = (( state=initState, action ) => {
  switch ( action.type ) {

  // Set docs visible
  case 'SET_DOCS_VISIBLE' : {
    return Object.assign ({}, state, {
      visible : Boolean ( action.payload.visible ),
    });
  }

  // Default case
  default : { return state; }

  }
});

// Exports
export default docsUiReducer;