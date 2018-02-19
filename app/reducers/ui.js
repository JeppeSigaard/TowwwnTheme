

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

    active : false,
    content : null,
    headless : false,
    borderless : false,
    closeable : true,
    onClose : null,

  },

  notifications : [
    
  ],

  shown_single_event : null,
  shown_category : null,
  shown_single_place : null,

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

        from : action.payload.from,
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

    /* ---- Enable modal box ---- */
    case "ENABLE_MODALBOX": {

      // Extracts data and returns
      let ap = action.payload;
      return Object.assign({}, state, { modalbox : {

        active     : true,
        content    : ap.content,
        title      : ap.title,
        headless   : ap.headless,
        borderless : ap.borderless,
        closeable  : ap.closeable,
        onClose    : ap.onClose

      }});

    }

    /* ---- Disable modal box ---- */
    case "DISABLE_MODALBOX": {
      return Object.assign({}, state, { modalbox : {
        active : false,
      }});
    }

    /* ---- Add Notification ---- */
    case "ADD_NOTIFICATION": {
      
      // Creates notifications array
      let notifications = state.notifications.concat([{
        id : state.notifications.length,
        timeCreated : (new Date()).getTime(),
        text : action.payload.text,
      }]);

      // Returns
      return Object.assign ({}, state, {
        notifications
      });

    }

    /* ---- Default ---- */
    default: { return state; }

  }
});

// Exports
export default UIReducer;
