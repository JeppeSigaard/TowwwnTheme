

// Initial state
const initState = {
  isMobile : false,
};

// Mobile Reducer
const mobileReducer = (( state=initState, action ) => {
  switch ( action.type ) {

  /* ---- Set mobile mode ---- */
  case 'SET_MOBILE_MODE' : {

    // Error handling
    if ( action.payload.mobile == null ) { 
      return state; 
    }

    // View related
    return Object.assign({}, state, {
      isMobile : action.payload.mobile,
    });

  }

  // Default case
  default: { return state; }

  }
});

// Exports
export default mobileReducer;