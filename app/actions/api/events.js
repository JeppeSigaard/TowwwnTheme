

// Imports
import { store } from '../../store.js';

// Pages
let pages = { };

// Events API action creators
const getFutureEvents = (( amount, page ) => (( dispatch ) => {

  // Events fetching action dispatch
  dispatch({ type : 'EVENTS_FETCHING' });

  // Extracts data
  let city = store.getState().config.city;
  amount = (amount == null) ? 24 : amount;

  // Error handling
  if ( city == null ) { return; }

  // Pages handling
  if ( pages[city] == null ) { pages[city] = 0; }
  page = page == null ? pages[city] : page;
  pages[city] ++;

  // Creates a new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Elements
    let elements = JSON.parse( response.target.response );

    // Events fetched action dispatch
    dispatch({ type : 'EVENTS_FETCHED', payload : {
      elements, city,
      accuracy : elements.length/amount,
      future : true,
    }});

  });

  // Opens and sends the request
  request.open( 'GET', app_data.rest_api+'/events?per_page='+
    amount+'&page='+page+'&after=now&city='+city );

  request.send();

}));

// Exports
export { getFutureEvents };
