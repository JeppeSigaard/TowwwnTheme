

// UI Actions
// Set view focus
const setViewFocus = (( leftview, rightview, mview, from, transition ) => {
  return {
    type : "CHANGE_VIEW_FOCUS",
    payload : { leftview, rightview,
      mview, from, transition }
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

// Set shown category
const setShownCategory = (( id ) => {

  // Error handling
  if ( typeof Number(id) !== 'number' ) {
    id = String(id['category_id']);

    if ( id == null ) {
      throw "SET_SHOWN_SINGLE_EVENT: Id not found.";
      return;
    }
  }

  // Returns
  return {
    type : "SET_SHOWN_CATEGORY",
    payload : { id }
  };

});

// Set mobile
const setMobileMode = ((mobile) => {
  return {
    type : "SET_MOBILE_MODE",
    payload : { mobile }
  };
});

// Exports
export { setViewFocus, setShownSingleEvent, setShownCategory, setMobileMode };
