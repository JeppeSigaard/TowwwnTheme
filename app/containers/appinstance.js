

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

import ModalBox from '../presentationals/modalbox.js';
import Cities from './parts/cities.js';

// Actions
import { getDefaultData } from '../actions/api/defaultdata.js';
import { getCities } from '../actions/api/cities.js';
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

        <ModalBox title="Hvor befinder du dig?" closeable={false} borderless={false} >
          <Cities store={ this.props.store } />
        </ModalBox>
      </div>
    );
  }

  // Initial one time load
  initialOneTimeLoad() {

      // Fetches cities
      if ( !this.props.store.getState().cities.fetched &&
           !this.props.store.getState().cities.fetching ) {

        this.props.store.dispatch(getCities());

      }

  }

  // Fetch default data
  onStoreChange( ) {

    // If city is set, load data.
    if ( this.props.store.getState().config.city != null ) {

      // Fetches default data
      if ( !this.props.store.getState().defaultdata.fetched &&
           !this.props.store.getState().defaultdata.fetching  ) {
        this.props.store.dispatch(getDefaultData());
      }

      // Fetches commercials
      if ( !this.props.store.getState().advertisements.fetched &&
           !this.props.store.getState().advertisements.fetching  ) {
        this.props.store.dispatch(getAdvertisements());
      }

    }

  }

  // Component did mount
  componentDidMount() {

    // Initial one time load
    if ( this.props.store != null ) {
      this.initialOneTimeLoad( );
    }

    // Removes load state
    let body = document.getElementsByTagName('body');
    for ( let n = 0; n < body.length; n++ ) {
      body[n].classList.remove( 'loading' );
    }

    // Sets fields
    this.viewHandler = new ViewHandler( this.props.store );

  }

  // Component will mount & component will receive props
  componentWillMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }
  }

}

// Exports
export default AppInstance;
