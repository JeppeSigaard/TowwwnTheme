

// Set mobile
const setMobileMode = (( mobile ) => {
  return {
    type : 'SET_MOBILE_MODE',
    payload : { mobile }
  };
});

// Exports
export { setMobileMode };