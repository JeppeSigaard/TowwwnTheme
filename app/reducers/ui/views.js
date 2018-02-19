

// Initial state
const initState = {

  x_leftview : null,
  x_rightview : null,
  x_mview : null,

  leftview : 'welcome-view',
  rightview : 'calendar-view',
  mview : 'calendar-view',

  transition : false,
  from : 'right',

};

// Views reducer
const viewsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

  // Change view focus
  case 'CHANGE_VIEW_FOCUS' : {

    // Error handling
    if ( action.payload.leftview == null ||
           action.payload.rightview == null ||
           action.payload.mview == null )
    { return state; }

    // Composes new state
    return Object.assign({}, state, {

      x_leftview  : state.leftview,
      x_rightview : state.rightview,
      x_mview : state.mview,

      leftview  : action.payload.leftview,
      rightview : action.payload.rightview,
      mview : action.payload.mview,

      from : action.payload.from,
      transition : action.payload.transition,

    });

  }

  // Default case
  default: { return state; }

  }
});

// Exports
export default viewsReducer;