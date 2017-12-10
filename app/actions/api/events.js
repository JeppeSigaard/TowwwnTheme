

// Events API action creators
const getFutureEvents = (( amount, page ) => {
  return (( dispatch ) => {

    // Events fetching action dispatch
    dispatch({ type : 'EVENTS_FETCHING' });

    // Extracts data
    amount = (amount == null) ? 24 : amount;
    page   = (page   == null) ? 1  : page;

    // Creates a new request
    let request = new XMLHttpRequest();
    request.onload = (( response ) => {

      // Events fetched action dispatch
      dispatch({ type : 'EVENTS_FETCHED', payload : {
        elements : JSON.parse( response.target.response )
      }});

    });

    // Opens and sends the request
    request.open( 'GET', app_data.rest_api+'/events?per_page='+
      amount+'&page='+page+'&after=now' );

    request.send();

  });
});

// Exports
export { getFutureEvents };
