
// ESLint, disable features
/*global app_data:true*/

// Places API actions
const getPlaces = (( amount, cat, page ) => (( dispatch ) => {

  // Dispatches places fetching action
  dispatch({ type : 'PLACES_FETCHING' });

  // Extracts data
  amount = amount == null ? 999999 : amount;
  cat = cat == null ? '' : '&cat='+cat;
  page = page == null ? 1 : page;

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches places fetched action
    dispatch({ type : 'PLACES_FETCHED', payload: {
      elements : JSON.parse( response.target.response )
    }});

    // Returns promise.resolve
    return Promise.resolve();

  });

  // Opens and sends the request
  request.open( 'GET', app_data.rest_api+'/locations?per_page='+
    amount+'&page='+page+cat );

  request.send();

}));

// Get single place
const getSinglePlace = (( id ) => ( dispatch ) => {

  // Error handling
  if(id==null){return false;}

  // Dispatches places fetching action
  dispatch({ type : 'PLACES_FETCHING' });

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches places fetched
    dispatch({ type : 'PLACES_FETCHED', payload : {
      elements : JSON.parse( response.target.response )
    }});

    // Creates new request to get children (events)
    let child_request = new XMLHttpRequest();
    child_request.onload = (( response ) => {

      // // Dispatches places fetched
      // dispatch({ type : "PLACE_CHILDS_FETCHED", payload : {
      //   elements : JSON.parse( response.target.response )
      // }});

    });

    // Opens and sends request
    // request.open( 'GET', app_data.rest_api+'/events?parent='+String(id) );
    // request.send();

  });

  // Opens and sends the request
  request.open( 'GET', app_data.rest_api+'/locations/'+String(id) );
  request.send();

});

// Exports
export { getPlaces, getSinglePlace };
