

// Set single event
const setShownSingleEvent = (( id ) => {

  // Error handling
  if ( typeof Number(id) !== 'number' ) {
    id = String( id.id );
    if ( id == null ) { throw 'SET_SHOWN_SINGLE_EVENT: Id not found.'; }
  }

  // Returns
  return {
    type : 'SET_SHOWN_SINGLE_EVENT',
    payload : { id }
  };

});

// Set shown category
const setShownCategory = (( id ) => {

  // Error handling
  if ( typeof Number(id) !== 'number' ) {
    id = String( id.category_id );
    if ( id == null ) { throw 'SET_SHOWN_CATEGORY: Id not found.'; }
  }

  // Returns
  return {
    type : 'SET_SHOWN_CATEGORY',
    payload : { id }
  };

});

// Set shown single place
const setShownSinglePlace = (( id ) => {

  // Error handling
  if ( typeof Number(id) !== 'number' ) {
    id = String( id.id );
    if ( id == null ) { throw 'SET_SHOWN_SINGLE_PLACE: Id not found.'; }
  }

  // Returns
  return {
    type : 'SET_SHOWN_SINGLE_PLACE',
    payload : { id }
  };

});

// Exports
export { 
  setShownSingleEvent,
  setShownCategory,
  setShownSinglePlace
};