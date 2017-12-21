

// UI Actions
// Set view focus
const setViewFocus = (( leftview, rightview, transition ) => {
  return {
    type : "CHANGE_VIEW_FOCUS",
    payload : { leftview, rightview, transition }
  };
});

// Set single event
const setShownSingleEvent = (( id ) => {

  // Error handling
  if ( typeof Number(id) !== 'number' ) {
    id = String(id['id']);

    if ( id == null ) {
      throw "SET_SHOWN_SINGLE_EVENT: Id not found.";
    }
  }

  // Returns
  return {
    type : "SET_SHOWN_SINGLE_EVENT",
    payload : { id }
  };

});

// Exports
export { setViewFocus, setShownSingleEvent };
