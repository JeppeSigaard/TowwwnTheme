

// Initial state
const initState = {
  
  fetching : false,
  fetched  : false,
  index    : null,
  elements : [ ],
    
};

// Docs Reducer
const docsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

  // Fetching
  case 'DOCS_FETCHING': {
    return Object.assign({}, state, {
      fetching : true,
    });
  }

  // Fetched
  case 'DOCS_FETCHED': {
    
    // Formats elements
    let payload = action.payload.elements, elements = { };
    for ( let n = 0; n < payload.length; n++ ) {
      elements[ payload[n].id ] = payload[n];
    }

    // Overwrites existing elems n' returns
    elements = Object.assign({}, state.elements, elements );
    return Object.assign({}, state, { elements });

  }
  
  // Default case
  default: { 
    return state; 
  }

  }
});

// Exports
export default docsReducer;