

// Set city
const setCity = (( id ) => ( dispatch ) => {

  // Extracts data
  if ( typeof id !== 'number' ) { return; }

  // Resets state and sets city
  // dispatch({ type : 'RESET_STATE' });
  dispatch({ type : "CHANGE_VIEW_FOCUS", payload: {
    leftview : 'welcome-view', rightview : 'calendar-view',
    mview : 'calendar-view', from: 'right', trans : false
  }});

  dispatch({ type : "CONFIG_SET_CITY", payload : { id } });

});

// Exports
export { setCity };
