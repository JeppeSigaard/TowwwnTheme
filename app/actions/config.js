

// Set city
const setCity = (( id ) => ( dispatch ) => {

  // Extracts data
  if ( typeof id !== 'number' ) { return; }

  // Resets state and sets city
  // dispatch({ type : 'RESET_STATE' });
  dispatch({ type : "CONFIG_SET_CITY", payload : { id } });
  dispatch({ type : "SET_VIEW_FOCUS", payload: {
    leftview : 'welcome-view', rightview : 'calendar-view',
    mview : 'calendar-view', from: 'right', trans : false
  }});

});

// Exports
export { getCategories };
