

// Imports
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import events from './reducers/events.js';
import categories from './reducers/categories.js';
import places from './reducers/places.js';

// Creates root reducer
const rootReducer = combineReducers({
  events, categories, places
});

// Compose enhancer & middleware... Used to activate redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware( thunk ));

// Creates store
const store = createStore( rootReducer, middleware );

// Exports
export { store };
