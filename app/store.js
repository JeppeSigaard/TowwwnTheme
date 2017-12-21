

// Imports
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import ui from './reducers/ui.js';
import defaultdata from './reducers/data/defaultdata.js';
import events from './reducers/data/events.js';
import categories from './reducers/data/categories.js';
import places from './reducers/data/places.js';

// Creates root reducer
const rootReducer = combineReducers({
  ui, defaultdata, events, categories, places
});

// Compose enhancer & middleware... Used to activate redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware( thunk ));

// Creates store
const store = createStore( rootReducer, middleware );

// Exports
export { store };
