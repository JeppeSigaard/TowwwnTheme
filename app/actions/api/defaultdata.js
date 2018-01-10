

// Imports
import { store } from '../../store.js';

// Default data
const getDefaultData = (() => ( dispatch ) => {

  // Dispatches fetching action
  dispatch({ type : 'DEFAULT_DATA_FETCHING' });

  // Extracts data
  let city = store.getState().config.city;

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches fetched action
    dispatch({
      type : 'DEFAULT_DATA_FETCHED',
      payload : { data : JSON.parse( response.target.response ) }
    });

  });

  // Opens and sends request
  request.open( 'GET', app_data.rest_api+'/default_data?city='+city );
  request.send();

});

// Exports
export { getDefaultData };
