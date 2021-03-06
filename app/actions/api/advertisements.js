
// ESLint, disable features
/*global app_data:true*/

// Commercials API actions
const getAdvertisements = (( ) => (( dispatch ) => {

  // Dispatches fetching action
  dispatch({ type : 'COMMERCIALS_FETCHING' });

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches fetched action
    dispatch({
      type : 'COMMERCIALS_FETCHED',
      payload : { elements : JSON.parse( response.target.response ) }
    });

  });

  // Opens and sends request (Internal, tmp.)
  request.open( 'GET', app_data.internal_rest_api+'/commercials' );
  request.send();

}));

// Exports
export { getAdvertisements };
