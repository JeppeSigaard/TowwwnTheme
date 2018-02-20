

// Imports
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { cookies } from '../tools/cookies.js';

import ErrorBoundary from './devtools/errorboundary.js';

import ViewHandler from '../tools/viewhandler.js';
import SideBar from './parts/sidebar.js';
import Notifications from './parts/notifications.js';
import ModalBox from '../presentationals/modalbox.js';
import Cookies from '../presentationals/parts/cookies.js';

// Views
import WelcomeView from './views/welcomeview.js';
import CalendarView from './views/calendarview.js';
import EventView from './views/eventview.js';
import CategoryView from './views/categoryview.js';
import PlaceListView from './views/placelistview.js';
import SinglePlaceView from './views/singleplaceview.js';

import Docs from './views/docs.js';

// Actions
import { getDefaultData } from '../actions/api/defaultdata.js';
import { getAdvertisements } from '../actions/api/advertisements.js';
import { enableModalBox, disableModalBox } from '../actions/ui/modalbox.js';

// Styling
import Styling from '../../style/base.scss';

// App Instance component
class AppInstance extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      modalbox : {
        active : false,
      }
    };
  }

  // Render
  render() {

    // Returns
    return (
      <ErrorBoundary>
        <div className="app">

          {/* Sidebar */}
          <SideBar store={ this.props.store } />

          {/* Inner */}
          <div className="app-inner">

            {/* Welcome view */}
            {/*<WelcomeView store={ this.props.store } />*/}

            {/* Event related */}
            <CalendarView store={ this.props.store } />
            <EventView store={ this.props.store } />

            {/* Place related */}
            <CategoryView store={ this.props.store } />
            <PlaceListView store={ this.props.store } />
            <SinglePlaceView store={ this.props.store } />

          </div>

          {/* Docs */}
          <Docs store={ this.props.store } />

          {/* Modal Box */}
          <CSSTransitionGroup

            transitionName="popup"
            transitionEnterTimeout={120}
            transitionLeaveTimeout={120} >

            { this.state.modalbox.active &&

              <ModalBox key="modalbox"
                title={ this.state.modalbox.title }
                headless={ this.state.modalbox.headless }
                borderless={ this.state.modalbox.borderless }
                closeable={ this.state.modalbox.closeable }
                onClose={ this.state.modalbox.onClose } >

                { this.state.modalbox.content != null &&
                  this.state.modalbox.content }

              </ModalBox>

            }

          </CSSTransitionGroup >

          {/* Notification */}
          <Notifications store={ this.props.store } />

        </div>
      </ErrorBoundary>
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
      props.store.dispatch(getAdvertisements());

    }

  }

  // Enable cookies modal box
  enableCookiesModalBox() {

    // If cookies haven't already been accepted
    if ( cookies.getItem('cookies_accepted') !== 'true' ) {

      // Weeeelll... Make them!
      this.props.store.dispatch(enableModalBox(
        <Cookies onClick={this.disableCookiesModalBox.bind(this)} />,
        'Cookies', true, false, false,
        this.disableCookiesModalBox.bind(this)
      ));

    }

  }

  // Disable cookies modal box
  disableCookiesModalBox() {
    this.props.store.dispatch(disableModalBox());
  }

  // On store change
  onStoreChange() {
    this.setState({
      modalbox : this.props.store.getState().modalbox
    });
  }

  // Component did mount
  componentDidMount() {

    // Subscribes to store
    if ( this.props.store != null ) {
      this.props.store.subscribe( this.onStoreChange.bind(this) );
    }

    // Enables cookies modal box
    this.enableCookiesModalBox();

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
