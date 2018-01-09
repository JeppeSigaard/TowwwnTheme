

// Imports
import { store } from '../../store.js';

// Current future page, per 24.
let curPage = 0;

// Events API action creators
const getFutureEvents = (( amount, page, city ) => (( dispatch ) => {

  // Events fetching action dispatch
  dispatch({ type : 'EVENTS_FETCHING' });

  // Extracts data
  let city = store.getState().config.city;
  amount = (amount == null) ? 24 : amount;
  page   = (page   == null) ? curPage : page;

  // Creates a new request
  let request = new XMLHttpRequest();
  request.onload = (( response ) => {

    // Elements
    let elements = JSON.parse( response.target.response );

    // Updates page counter
    if(elements!=null){curPage++;}

    // Events fetched action dispatch
    dispatch({ type : 'EVENTS_FETCHED', payload : {
      elements,
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
