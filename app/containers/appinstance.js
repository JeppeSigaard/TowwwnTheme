

// Imports
import React from 'react';
import ViewHandler from '../tools/viewhandler.js';

// Views
import WelcomeView from './views/welcomeview.js';
import CalendarView from './views/calendarview.js';
import EventView from './views/eventview.js';

// Actions
import { getDefaultData } from '../actions/api/defaultdata.js';

// Styling
import Styling from '../../style/base.scss';

// App Instance component
class AppInstance extends React.Component {

  // Render
  render() {
    return (
      <div className="app">
        <div className="app-inner">
          <WelcomeView store={ this.props.store } />
          <CalendarView store={ this.props.store } />
          <EventView store={ this.props.store } />
        </div>
      </div>
    );
  }

  // Fetch default data
  fetchDefaultData( props ) {

    // Dispatches an action that fetches default data
    if ( props.store != null &&
         !props.store.getState().defaultdata.fetched )
         { props.store.dispatch(getDefaultData()); }

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
