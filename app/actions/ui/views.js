

// Set view focus
const setViewFocus = (( leftview, rightview, mview, from, transition ) => {
  return {
    type : 'CHANGE_VIEW_FOCUS',
    payload : { 
      leftview, rightview,
      mview, from, transition 
    }
  };
});

// Exports
export { setViewFocus };