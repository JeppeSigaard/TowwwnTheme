

// Initial state
const initState = {
  elements : [

  ],
};

// Notifications Reducer
const notificationsReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Add Notification ---- */
    case "ADD_NOTIFICATION": {
      
      // Creates notifications array
      return Object.assign({}, state, {
        elements : state.elements.concat([{

          id : state.elements.length,
          timeCreated : (new Date()).getTime(),
          text : action.payload.text,
          
        }])
      });

    }

    // Default case
    default: { return state; }

  }
});

// Exports
export default notificationsReducer;