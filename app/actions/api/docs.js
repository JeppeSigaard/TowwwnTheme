
// ESLint, disable features
/*global app_data:true*/

// Docs API actions
const getDocs = (() => ( dispatch ) => {

  // Dispatches fetching action
  dispatch({ type : 'DOCS_FETCHING' });

  // Creates new request
  let request = new XMLHttpRequest ();
  request.onload = (( response ) => {

    // Dispatched fetched action
    dispatch ({
      type : 'DOCS_FETCHED',
      payload : { elements : JSON.parse( response.target.response ) }
    });

  });

  // Opens and sends request
  request.open ( 'GET', app_data.internal_rest_api+'/docs' );
  request.send ( );

});

// Exports
export { getDocs };