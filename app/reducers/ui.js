

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
    from : 'right',
    mobile : false,

  },

  modalbox : {

    active : true,
    content : null,
    title : null,
    headless : true,
    closeable : false,
    borderless : false,

  },

  shown_single_event : null,
  shown_category : null,
  shown_single_place : null,

};

// Reducer
const UIReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Set city ---- */
    case "CONFIG_SET_CITY": {
      return Object.assign({}, state, {
        shown_single_event : null,
        shown_category : null,
        shown_single_place : null,
      });
    }

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

        from : action.payload.from,
        transition : action.payload.transition,

      });

      // Returns
      return Object.assign({}, state, {viewrelated});

    }

    /* ---- Enable modalbox ---- */
    case "ENABLE_MODALBOX": {

      // Sets active to true, and sets modalbox setting
      action.payload.active = true;
      let modalbox = Object.assign({}, state.modalbox, action.payload);

      // Returns
      return Object.assign({}, state, { modalbox });

    }

    /* ---- Diable modalbox  ---- */
    case "DISABLE_MODALBOX": {

      // Sets modalbox to inactive and returns
      let modalbox = Object.assign({}, state.modalbox, { active : false });
      return Object.assign({}, state, { modalbox });

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

    /* ---- Set shown category ---- */
    case "SET_SHOWN_CATEGORY" : {

      // Error handling
      if ( action.payload.id == null )
        { return state; }

      // Return state
      return Object.assign({}, state, {
        shown_category : action.payload.id
      });

    }

    /* ---- Set shown single place ---- */
    case "SET_SHOWN_SINGLE_PLACE" : {

      // Error handling
      if ( action.payload.id == null )
        { return state; }

      // Return state
      return Object.assign({}, state, {
        shown_single_place : action.payload.id
      });

    }

    /* ---- Set mobile mode ---- */
    case "SET_MOBILE_MODE" : {

      // Error handling
      if (action.payload.mobile==null)
        {return state;}

      // View related
      let viewrelated = Object.assign({}, state.viewrelated, {
        mobile : action.payload.mobile,
      });

      // Returns
      return Object.assign({}, state, {viewrelated});

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default UIReducer;
