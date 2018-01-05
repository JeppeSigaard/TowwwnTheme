

// Imports
import React from 'react';

// Actions
import { setViewFocus } from '../../actions/ui.js';


// Side bar component
class SideBar extends React.Component {

  // Ctor
  constructor() {
    super();
    this.state = {

      open : false,
      active_type : 'events',

      future_event_count : 0,
      place_count : 0,

    };
  }

  // Render
  render() {
    return (
      <div className={ "sidebar " + (this.state.open ? "forceopen" : "") }
        onClick={ this.onClick.bind(this, null) } >

        {/* Header */}
        <header className="town">

          <div className="icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#towwwn-logo-17">
              </use>
            </svg>
          </div>

          <div className="text">
            Svendborg
          </div>

        </header>

        {/* Events */}
        <section className={"sidebar-events "+(this.state.active_type==='events'?'active':'')}
          onClick={ this.onClick.bind(this, 'events') } >

          <div className="icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-event">
              </use>
            </svg>
          </div>

          <div className="text">
            { this.state.future_event_count }

            <div className="subtext">
              Begivenheder
            </div>
          </div>

        </section>

        {/* Places */}
        <section className={"sidebar-places "+(this.state.active_type==='places'?'active':'')}
          onClick={ this.onClick.bind(this, 'places') } >

          <div className="icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-location">
              </use>
            </svg>
          </div>

          <div className="text">
            { this.state.place_count }

            <div className="subtext">
              Lokale Steder
            </div>
          </div>

        </section>

      </div>
    );
  }

  // On click
  onClick( type ) {
    if ( this.props.store == null ) { return; }

    // If type is null or we are in mobile view
    // just open the sidebar
    if ( (type == null || ( this.props.store != null &&
      this.props.store.getState().ui.viewrelated.mobile )) &&
      !this.state.open ) {

      this.setState({ open : true });
      return;

    } else { this.setState({ open : false }); }

    // Else actually open the things
    // Events?
    if ( 'events' === type ) {

      // Dispatches view focus action
      this.props.store.dispatch(setViewFocus(
        'welcome-view', 'calendar-view', 'calendar-view',
        'right', false
      ));

      // Sets state
      this.setState({ active_type : 'events' });

    }

    // Or places?
    if ( 'places' === type ) {

      // Dispatches view focus action
      this.props.store.dispatch(setViewFocus(
        'welcome-view', 'category-view', 'category-view',
        'right', false
      ));

      // Sets state
      this.setState({ active_type : 'places' });

    }

  }

  // On store change
  onStoreChange() {

    // Gets state and creates response field
    let state = this.props.store.getState();
    let response = { };

    // Extracts data
    // Future event count
    if ( state.defaultdata.data.future_event_count != null ) {
      response.future_event_count = state.defaultdata.data.future_event_count;
    }

    // Place cpunt
    if ( state.defaultdata.data.place_count != null ) {
      response.place_count = state.defaultdata.data.place_count;
    }

    // Sets state
    this.setState(response);

  }

  // Component will mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }
  }

}

// Exports
export default SideBar;
