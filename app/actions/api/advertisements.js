

// Commercials API actions
const getAdvertisements = (( ) => (( dispatch ) => {

  // Dispatches fetching action
  dispatch({ type : "COMMERCIALS_FETCHING" });

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches fetched action
    dispatch({
      type : "COMMERCIALS_FETCHED",
      payload : { elements : JSON.parse( response.target.response ) }
    });

  });

  // Opens and sends request (Localhost, tmp.)
  request.open( 'GET', 'http://localhost/towwwn/api/v1/commercials' );
  request.send();

}));

// Exports
export { getAdvertisements };
