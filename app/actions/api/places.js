

// Places API actions
const getPlaces = (( amount, cat, page ) => {
  return (( dispatch ) => {

    // Dispatches places fetching action
    dispatch({ type : "PLACES_FETCHING" });

    // Extracts data
    amount = amount == null ? 100000 : amount;
    cat = cat == null ? '' : '&cat='+cat;
    page = page == null ? 1 : page;

    // Creates new request
    let request = new XMLHttpRequest();
    request.onload = (( response ) => {

      // Dispatches places fetched action
      dispatch({ type : "PLACES_FETCHED", payload: {
        elements : JSON.parse( response.target.response )
      }});

    });

    // Opens and sends the
    request.open( 'GET', app_data.rest_api+'/locations?per_page='+
      amount+'&page='+page+cat );

    request.send();

  });
});

// Exports
export { getPlaces };
