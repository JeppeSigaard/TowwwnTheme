

// Imports
import React from 'react';
import ViewHandler from '../tools/viewhandler.js';

import SideBar from './parts/sidebar.js';

// Views
import WelcomeView from './views/welcomeview.js';

import CalendarView from './views/calendarview.js';
import EventView from './views/eventview.js';

import CategoryView from './views/categoryview.js';
import PlaceListView from './views/placelistview.js';
import SinglePlaceView from './views/singleplaceview.js';

// Actions
import { getDefaultData } from '../actions/api/defaultdata.js';
import { getAdvertisements } from '../actions/api/advertisements.js';

// Styling
import Styling from '../../style/base.scss';

// App Instance component
class AppInstance extends React.Component {

  // Render
  render() {
    return (
      <div className="app">
        <SideBar store={ this.props.store } />

        <div className="app-inner">

          {/* Welcome view */}
          <WelcomeView store={ this.props.store } />

          {/* Event related */}
          <CalendarView store={ this.props.store } />
          <EventView store={ this.props.store } />

          {/* Place related */}
          <CategoryView store={ this.props.store } />
          <PlaceListView store={ this.props.store } />
          <SinglePlaceView store={ this.props.store } />

        </div>
      </div>
    );
  }

  // Fetch default data
  fetchDefaultData( props ) {

    // Dispatches an action that fetches default data and
    // an action that fetches all commercials.
    if ( props.store != null ) {

      // Fetches default data
      if ( !props.store.getState().defaultdata.fetched ) {
        props.store.dispatch(getDefaultData());
      }

      // Fetches commercials
      if ( true ) {
        props.store.dispatch(getAdvertisements());
      }

    }

  }

  // Component did mount
  componentDidMount() {

    // Removes load state
    let body = document.getElementsByTagName('body');
    for ( let n = 0; n < body.length; n++ ) {
      body[n].classList.remove( 'loading' );
    }

    // Sets fields
    this.viewHandler = new ViewHandler( this.props.store );

  }

  // Component will mount & component will receive props
  componentWillMount() { this.fetchDefaultData(this.props); }
  componentWillReceiveProps(props) { this.fetchDefaultData(props); }

}

// Exports
export default AppInstance;
