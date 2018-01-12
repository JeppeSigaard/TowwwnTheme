

// Imports
import { store } from '../../store.js';

// Categories API actions
const getCategories = (( amount, orderby, order ) => (( dispatch ) => {

  // Dispatches categories fetching action
  dispatch({ type : "CATEGORIES_FETCHING" });

  // Extracts data
  let city = store.getState().config.city;
  amount  = ( amount == null  ) ? 9999   : amount;
  orderby = ( orderby == null ) ? 'name' : orderby;
  order   = ( order == null   ) ? 'ASC'  : order;

  // Error handling
  if ( city == null ) { return; }

  // Creates new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Dispatches categories fetched action
    dispatch({ type : "CATEGORIES_FETCHED", payload : {
        elements : JSON.parse( response.target.response ),
    }});

  });

  // Opens and sends request
  request.open( 'GET', app_data.rest_api+'/categories?per_page='+
    amount+'&orderby='+orderby+'&order='+order+'&city='+city );

  request.send();

}));

// Exports
export { getCategories };
