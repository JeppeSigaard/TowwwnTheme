

// Imports
import React from 'react';
import View from '..//view.js';

// Components
import Loader from '../../presentationals/parts/loader.js';
import Event from '../parts/event.js';
import Advertisement from '../../presentationals/advertisement.js';

// Actions
import { getFutureEvents } from '../../actions/api/events.js';

// Calendar view component
class CalendarView extends View {

  // Constructor
  constructor( props ) {
    super( props );
    this.state = {
      ids : null,
      title : 'Begivenheder',
    };
  }


  // Render
  render() {

    // Extracts data
    let state = this.props.store.getState();

    // Returns
    return (
      <View id="calendar-view" title={this.state.title}
        icon="#icon-event" viewBox="0 0 32 32"
        onScroll={ this.onScroll.bind(this) }
        store={ this.props.store }>

        <div className="event-calendar" key={ 'event-calendar' } >

          {/* Events */}
          { this.state.ids != null &&

            this.preprocess( this.state.ids )
              .map( this.renderElement.bind( this ) )

          }

          {/* Load more */}
          { this.state.ids != null &&
            this.state.ids.length>0 && this.props.store!=null &&
            state.events.data[state.config.city] != null &&
            !state.events.data[state.config.city].all_future_fetched &&

            <Loader relative={true} />

          }

          {/* All Loaded */}
          { this.props.store != null &&
            state.events.data[state.config.city] != null &&
            state.events.data[state.config.city].all_future_fetched &&

            <div className="all-fetched">
              <div className="all-fetched-inner">
              </div>
            </div>

          }

          {/* No Events */}
          { this.state.ids == null || this.state.ids.length<=0 &&

            <div className="no-events"></div>

          }

        </div>

      </View>
    );

  }

  // Render Element
  renderElement( val ) {

    // Extracts data
    let state = this.props.store.getState();
    let city_events = state.events.data[state.config.city];

    // If city is equal to null... Return nothing
    if ( city_events == null ) {
      return <p>An error occured</p>;
    }

    // Extracts more data
    let event = city_events.elements[val];
    if ( event == null ) { console.log('Cal, event is null.'); }

    // Checks if the event is bookmarked
    let bookmarked = false;
    let shown_single_event = state.ui.shown_single_event;
    let views = [ state.ui.viewrelated.leftview, state.ui.viewrelated.rightview ];

    // Does the actual checking
    if ( String(event['id']) === String(shown_single_event) &&
       ( views[0] === 'event-view' || views[1] === 'event-view' )) {
      bookmarked = true;
    }

    // Returns
    return (
      <Event element={ event }
        store={ this.props.store }
        key={ 'calendar-event#'+val }
        bookmarked={ bookmarked }
      />
    );

  }

  // Preprocess: Sorts & filters events.
  // Important: This needs to be a pure function, and use immutable data
  preprocess( ids ) {

    // Extracts data
    let state = this.props.store.getState();
    let city_events = state.events.data[state.config.city];

    // If no city events are found, well fetch em, else actually set events
    if ( city_events == null ) { return [ ]; }
    let events = city_events.elements;

    // Filters away old event
    let response = ids.filter(( val ) => {

        // Event and now
        let event = events[val];
        let now = (new Date()).getTime();

        // Error handling
        if ( event == null ) { return false; }

        // Start and end times in milliseconds
        let end_time = (event.end_time != null) ? (new Date(event.end_time)).getTime() : null;
        let start_time = (event.start_time != null) ? (new Date(event.start_time)).getTime() : null;

        // Returns
        if ( end_time != null ) { return now < end_time; }
        if ( start_time != null ) { return now < start_time; }
        return false;

    });

    // Sorts event based on time
    response.sort(( a, b ) => {

      // Retirns
      if (events[a].start_time > events[b].start_time) { return 1; }
      if (events[a].start_time < events[b].start_time) { return -1; }
      return 0;

    });

    // Returns response
    return response;

  }


  // Load events
  loadEvents() {

    // Extracts data
    let state = this.props.store.getState();
    let fetching = state.events.fetching;

    // Fetches the next 24 events
    if ( !fetching ) { this.props.store.dispatch(getFutureEvents(24)); }

  }


  // Sets ids
  setIDs() {

    // Extracts data
    let state = this.props.store.getState();
    let city  = state.config.city;

    // Error handling
    if ( city == null ) { return; }

    // Sets title
    let city_data     = state.cities.data.elements[city];
    let title_prefix  = state.defaultdata.fetched ? state.defaultdata.data.future_event_count+' ' : '';
    let title_postfix = city != null ? ' i '+city_data.name : '';
    let title         = title_prefix + 'begivenheder' + title_postfix;

    // Sets ids
    let city_events = state.events.data[city];
    let ids = city_events != null ? Object.keys(city_events.elements) : [ ];

    // Sets state
    this.setState({ ids, title });

  }


  // On Store Change
  onStoreChange() {

    // State n' sets ids
    let state = this.props.store.getState();

    // Gets city events
    let city_events = state.events.data[state.config.city];
    if ( city_events == null || city_events.length <= 0 ) { this.loadEvents(); }

    // Sets ids
    this.setIDs();

    // Fixes some problems that occur with:
    // multiple events with same id, etc.
    // (Refers to parent)
    this.processScroll();

  }

  // On Scroll
  onScroll(payload) {

    // If not already fetching, check if more fetching is needed
    if (!this.props.store.getState().events.fetching &&
        !this.props.store.getState().events.all_future_fetched) {

      // Extracts data
      let scrollBottom = Number(payload.scrollY) + parseInt(payload.viewCSSProps['height']),
        fromBottom = parseInt(payload.innerViewCSSProps['height']) - scrollBottom;

      // Checks if load more is needed (24 future events)
      if (fromBottom<=600) {
        this.loadEvents();
      }

    }

  }


  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.unsubscribe = this.props.store.subscribe(
        this.onStoreChange.bind( this )
      );
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
export default CalendarView;
