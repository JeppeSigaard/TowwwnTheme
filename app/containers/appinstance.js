

// Imports
import React from 'react';
import ViewHandler from '../tools/viewhandler.js';

import SideBar from './parts/sidebar.js';
import ModalBox from '../presentationals/modalbox.js';
import Cities from './parts/cities.js';

// Views
import WelcomeView from './views/welcomeview.js';
import CalendarView from './views/calendarview.js';
import EventView from './views/eventview.js';
import CategoryView from './views/categoryview.js';
import PlaceListView from './views/placelistview.js';
import SinglePlaceView from './views/singleplaceview.js';

// Actions
import { enableModalBox, disableModalBox } from '../actions/ui.js';
import { getDefaultData } from '../actions/api/defaultdata.js';
import { getCities } from '../actions/api/cities.js';
import { getAdvertisements } from '../actions/api/advertisements.js';

// Styling
import Styling from '../../style/base.scss';

// App Instance component
class AppInstance extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      modalbox : null,
    };
  }

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

        { this.state.modalbox != null && this.state.modalbox }

      </div>
    );
  }

  // Enable cities modal box
  enableCitiesModalBox() {
    this.props.store.dispatch(enableModalBox(
      <Cities onClick={this.disableCitiesModalBox.bind(this)} store={this.props.store} />,
      '', true, false, false, null
    ));
  }

  // Disable citites modal box
  disableCitiesModalBox() {
    this.props.store.dispatch(disableModalBox());
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

    // Gets state
    let state = this.props.store.getState();

    // If city is set, load data.
    if ( state.config.city != null ) {

      // Fetches default data
      if ( !state.defaultdata.fetched &&
           !state.defaultdata.fetching  ) {
        this.props.store.dispatch(getDefaultData());
      }

      // Fetches commercials
      if ( !state.advertisements.fetched &&
           !state.advertisements.fetching  ) {
        this.props.store.dispatch(getAdvertisements());
      }

    }

    // Sets modal box
    if ( state.ui.modalbox.active ) {

      this.setState({ modalbox :

        <ModalBox title={state.ui.modalbox.title}
          headless={state.ui.modalbox.headless}
          borderless={state.ui.modalbox.borderless}
          closeable={state.ui.modalbox.closeable}
          onClose={state.ui.modalbox.onClose} >

          { state.ui.modalbox.content != null &&
            state.ui.modalbox.content }

        </ModalBox>

      });

    } else {

      this.setState({ modalbox : null });

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

    // Enables modal box
    this.enableCitiesModalBox();

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
