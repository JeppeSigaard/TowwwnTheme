

// UI Actions
// Set view focus
const setViewFocus = (( leftview, rightview, mview, from, transition ) => {
  return {
    type : "CHANGE_VIEW_FOCUS",
    payload : { leftview, rightview,
      mview, from, transition }
  };
});

// Enable modal box
const enableModalBox = (( content, title, headless, borderless, closeable, onClose ) => {
  return {
    type : "ENABLE_MODALBOX",
    payload : {
      content, title, headless,
      borderless, closeable, onClose
    }
  };
});

// Disable modal box
const disableModalBox = (() => {
  return {
    type : "DISABLE_MODALBOX",
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
      throw "SET_SHOWN_CATEGORY: Id not found.";
      return;
    }
  }

  // Returns
  return {
    type : "SET_SHOWN_CATEGORY",
    payload : { id }
  };

});

// Set shown single place
const setShownSinglePlace = (( id ) => {

  // Error handling
  if ( typeof Number(id) !== 'number' ) {
    id = String(id['id']);

    if ( id == null ) {
      throw "SET_SHOWN_SINGLE_PLACE: Id not found.";
      return;
    }
  }

  // Returns
  return {
    type : "SET_SHOWN_SINGLE_PLACE",
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
export {
  setViewFocus,
  enableModalBox,
  disableModalBox,
  setShownSingleEvent,
  setShownCategory,
  setShownSinglePlace,
  setMobileMode
};
