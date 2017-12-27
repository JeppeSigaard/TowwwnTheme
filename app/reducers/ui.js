

// Init state
const initState = {

  viewrelated : {
    x_leftview : null,
    x_rightview : null,
    x_mview : null,
    leftview : 'welcome-view',
    rightview : 'calendar-view',
    mview : 'calendar-view',
    transition : false,
  },

  mobile : false,
  shown_single_event : null,

};

// Reducer
const UIReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Change View Focus ---- */
    case "CHANGE_VIEW_FOCUS" : {

      // Error handling
      if ( action.payload.leftview == null ||
           action.payload.rightview == null ||
           action.payload.mview == null )
        { return state; }

      // Composes new state
      let viewrelated = Object.assign({}, state.viewrelated, {
        x_leftview  : state.viewrelated.leftview,
        x_rightview : state.viewrelated.rightview,
        x_mview : state.viewrelated.mview,
        leftview  : action.payload.leftview,
        rightview : action.payload.rightview,
        mview : action.payload.mview,
        transition : action.payload.transition,
      });

      // Returns
      return Object.assign({}, state, {viewrelated});

    }

    /* ---- Set shown single event ---- */
    case "SET_SHOWN_SINGLE_EVENT" : {

      // Error handling
      if ( action.payload.id == null )
        { return state; }

      // Return state
      return Object.assign({}, state, {
        shown_single_event : action.payload.id
      });

    }

    /* ---- Set mobile mode ---- */
    case "SET_MOBILE_MODE" : {

      // Error handling
      if (action.payload.mobile==null)
        {return state;}

      // Returns
      return Object.assign({}, state, {
        mobile : action.payload.mobile,
      });

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default UIReducer;
