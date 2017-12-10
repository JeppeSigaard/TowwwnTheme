

// Imports
import React from 'react';
import ReactDOM from 'react-dom';

// Redux relates
import { store } from './store.js';

// Components
import AppInstance from './containers/appinstance.js';

// Render
const root = document.getElementById('main-container');
ReactDOM.render( <AppInstance store={store} />, root );
