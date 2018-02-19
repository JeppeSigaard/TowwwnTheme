

// Imports
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

// Reducers
import defaultdata from './reducers/data/defaultdata.js';

import mobile from './reducers/ui/mobile.js';
import modalbox from './reducers/ui/modalbox.js';
import notifications from './reducers/ui/notifications.js';
import shownelements from './reducers/ui/shownelements.js';
import views from './reducers/ui/views.js';

import events from './reducers/data/events.js';
import categories from './reducers/data/categories.js';
import places from './reducers/data/places.js';
import advertisements from './reducers/data/advertisements.js';

// Creates root reducer
const rootReducer = combineReducers({
  defaultdata, mobile, modalbox,
  notifications, shownelements,
  views, events, categories, 
  places, advertisements
});

// Compose enhancer & middleware... Used to activate redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = composeEnhancers(applyMiddleware( thunk ));

// Creates store
const store = createStore( rootReducer, middleware );

// Exports
export { store };
