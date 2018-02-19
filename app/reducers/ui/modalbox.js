

// Initial state
const initState =  {

  active : false,
  content : null,
  headless : false,
  borderless : false,
  closeable : true,
  onClose : null,

};

// Modal Box Reducer
const modalBoxReducer = (( state=initState, action ) => {
  switch ( action.type ) {

    /* ---- Enable modal box ---- */
    case "ENABLE_MODALBOX": {

      // Extracts data and returns
      let ap = action.payload;
      return Object.assign({}, state, {

        active     : true,
        content    : ap.content,
        title      : ap.title,
        headless   : ap.headless,
        borderless : ap.borderless,
        closeable  : ap.closeable,
        onClose    : ap.onClose

      });

    }

    /* ---- Disable modal box ---- */
    case "DISABLE_MODALBOX": {
      return Object.assign({}, state, {
        active : false,
      });
    }

    // Default case
    default: { return state; }

  }
}); 

// Exports
export default modalBoxReducer;