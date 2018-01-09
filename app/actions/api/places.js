

// Imports
import { store } from '../../store.js';

// Places API actions
const getPlaces = (( amount, cat, page ) => (( dispatch ) => {

  // Dispatches places fetching action
  dispatch({ type : "PLACES_FETCHING" });

  // Extracts data
  let city = store.getState().config.city;
  amount = amount == null ? 999999 : amount;
  cat = cat == null ? '' : cat;
  page = page == null ? 1 : page;

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches places fetched action
    dispatch({ type : "PLACES_FETCHED", payload: {
      elements : JSON.parse( response.target.response )
    }});

    // Returns promise.resolve
    return Promise.resolve();

  });

  // Opens and sends the request
  request.open( 'GET', app_data.rest_api+'/places?per_page='+
    amount+'&page='+page+'&cat='+cat+'&city='+city );

  request.send();

}));

// Get single place
const getSinglePlace = (( id ) => ( dispatch ) => {

  // Error handling
  if(id==null){return false;}

  // Dispatches places fetching action
  dispatch({ type : "PLACES_FETCHING" });

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches places fetched
    dispatch({ type : "PLACES_FETCHED", payload : {
      elements : JSON.parse( response.target.response )
    }});

  });

  // Opens and sends the request
  request.open( 'GET', app_data.rest_api+'/places/'+String(id) );
  request.send();

});

// Exports
export { getPlaces, getSinglePlace };
