

// Imports
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import ui from './reducers/ui.js';
import config from './reducers/config.js';
import cities from './reducers/data/cities.js';
import defaultdata from './reducers/data/defaultdata.js';

import events from './reducers/data/events.js';
import categories from './reducers/data/categories.js';
import places from './reducers/data/places.js';
import advertisements from './reducers/data/advertisements.js';

// Creates root reducer
const rootReducer = (( state, action ) => {

  // Returns reducers
  return combineReducers({
    ui, cities, defaultdata,
    events, categories, places,
    advertisements,
    config
  })( state, action );

});

// Compose enhancer & middleware... Used to activate redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware( thunk ));

// Creates store
const store = createStore( rootReducer, middleware );

// Exports
export { store };
