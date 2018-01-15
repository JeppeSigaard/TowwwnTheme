

// Imports
import React from 'react';
import Cities from './cities.js';

// Actions
import { setViewFocus, enableModalBox, disableModalBox }
  from '../../actions/ui.js';


// Side bar component
class SideBar extends React.Component {

  // Ctor
  constructor() {
    super();
    this.state = {

      open : false,
      active_type : 'events',

      cur_city : null,
      cities : null,

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
            { this.state.cur_city != null &&
              this.state.cur_city.name }
          </div>

          <div className="change-city"
            onClick={this.enableCitiesModalBox.bind(this)}>

            Skift by

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
    if ( this.props.store != null &&
         this.props.store.getState().ui.viewrelated.mobile &&
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

    }

    // Or places?
    if ( 'places' === type ) {

      // Dispatches view focus action
      this.props.store.dispatch(setViewFocus(
        'welcome-view', 'category-view', 'category-view',
        'right', false
      ));

    }

  }

  // Enable cities modal box
  enableCitiesModalBox() {
    this.props.store.dispatch(enableModalBox(
      <Cities onClick={this.disableCitiesModalBox.bind(this)} store={this.props.store} />,
      'Skift By', false, false, true, this.disableCitiesModalBox.bind(this)
    ));
  }

  // Disable cities modal box
  disableCitiesModalBox() {
    this.props.store.dispatch(disableModalBox());
  }

  // On store change
  onStoreChange() {

    // Gets state and creates response field
    let state = this.props.store.getState();
    let response = { };

    // Extracts data
    // Gets citites and does stuff
    let cities = state.cities.data.elements;
    if ( cities != null ) {

      // Sets response['cities']
      response['cities'] = Object.keys( cities ).map(( val ) => {
        return cities[val];
      });

      // Gets current city n' sets response
      let cur_city = cities[state.config.city];
      if ( cur_city != null ) {
        response['cur_city'] = cur_city;
      }

    }


    // Future event count
    if ( state.defaultdata.data.future_event_count != null ) {
      response.future_event_count = state.defaultdata.data.future_event_count;
    }

    // Place count
    if ( state.defaultdata.data.place_count != null ) {
      response.place_count = state.defaultdata.data.place_count;
    }


    // Changes section color
    // Extracts data
    let active_type = 'events';
    let views = [
      state.ui.viewrelated.leftview,
      state.ui.viewrelated.rightview
    ];

    let place_related_views = [
      'welcome-view', 'category-view',
      'place-list-view', 'single-place-view'
    ];

    // Sets open type
    if ( place_related_views.includes(views[0]) &&
         place_related_views.includes(views[1])) {
      active_type = 'places';
    }

    // Sets response
    response['active_type'] = active_type;


    // Sets state
    this.setState(response);

  }

  // Component will mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.unsubscribe = this.props.store.subscribe(
        this.onStoreChange.bind(this));
    }
  }

  // Component will unmount
  componentWillUnmount() {
    if ( this.unsubscribe != null ) {
      this.unsubscribe();
    }
  }

}

// Exports
export default SideBar;
