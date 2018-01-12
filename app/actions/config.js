

// Set city
const setCity = (( id ) => ( dispatch ) => {

  // Extracts data
  if ( typeof id !== 'number' ) { return; }

  // Resets state and sets city
  // dispatch({ type : 'RESET_STATE' });
  dispatch({ type : "CONFIG_SET_CITY", payload : { id } });

});

// Exports
export { getCategories };
