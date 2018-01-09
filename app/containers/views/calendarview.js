

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

      ids : [ ],
      adOffset : Math.floor(Math.random() * 99),
      title : 'Begivenheder',

    };
  }

  // Render
  render() {
    return (
      <View id="calendar-view" title={this.state.title}
        icon="#icon-event" viewBox="0 0 32 32"
        onScroll={ this.onScroll.bind(this) }
        store={ this.props.store }>

        <div className="event-calendar" key={ 'event-calendar' } >

          {/* Events */}
          { this.state.ids.length>0 &&
            (this.preprocess(this.state.ids))
            .map( this.renderElement.bind(this) ) }

          {/* Load more */}
          { this.state.ids.length>0 && this.props.store!=null &&
            !this.props.store.getState().events.all_future_fetched &&
            <Loader relative={true} /> }

          {/* All Loaded */}
          { this.props.store != null &&
            this.props.store.getState().events.all_future_fetched &&
            <div className="all-fetched">
              <div className="all-fetched-inner">
              </div>
            </div>
          }

          {/* Loader */}
          { this.state.ids.length<=0 &&
            <Loader /> }

        </div>

      </View>
    );
  }

  // Render Element
  renderElement( val ) {

    // Event section
    if ( 'object' !== typeof val ) {

      // Extracts data
      let event = this.props.store.getState().events.elements[String( val )];
      if ( event == null ) { return (<div>An error occured</div>); }

      // Returns jsx event
      return (
        <Event element={event}
          store={this.props.store}
          key={ 'calendar-event#'+val }
        />
      );

    // Advertisement section
    } else if ( 'ad' === val.type ) {

      if ( this.props.store.getState().advertisements.elements != null ) {

        // Gets id, using the random offset to ensure that all ads
        // gets their place in the spotlight.
        let id = (val.id + this.state.adOffset) % this.props.store.getState()
          .advertisements.elements.length;

        // Gets an advertisement
        let ad = this.props.store.getState().advertisements.elements[id];
        if ( ad == null || val.id == null ) { return (<div>An error occured</div>) }

        // Returns jsx ad
        return (
          <Advertisement
            element={ ad }
            key={ 'ad#'+val.id }
            inline={ true } />
        );

      }

    }

  }

  // Preprocess: Sorts & filters events.
  // Important: This needs to be a pure function, and use immutable data
  preprocess( ids ) {

    // Remove advertisements
    this.removeAdvertisements(ids);

    // Is the store defined?
    if ( this.props.store != null ) {

      // State events
      const events = this.props.store.getState().events.elements;

      // Filters away old events
      let resp = ids.filter(( val ) => { val = String(val);

        if ( events[val].end_time!=null ) {
          return ((new Date(events[val].end_time)).getTime()
            > (new Date()).getTime());
        } else if ( events[val].start_time!=null ) {
          return ((new Date(events[val].start_time)).getTime()
            > (new Date()).getTime());
        }

        return false;

      });

      // Sorts event based on time
      resp.sort(( a, b ) => { a = String(a); b = String(b);
        if (events[a].start_time > events[b].start_time) { return 1; }
        if (events[a].start_time < events[b].start_time) { return -1; }
        return 0;
      });

      // Insert advertisements
      // this.insertAdvertisements(resp); <- TMP: Commented

      // Returns response
      return resp;

    }

    // Default response
    return ids;

  }

  // Insert advertisements
  insertAdvertisements( arr ) {
    let len = arr.length;
    for ( let n = 0; n < len; n += 25 ) {
      if ( n+24 <= arr.length ) {
        arr.splice( n+24, 0, { type: 'ad', id: Math.floor(n / 24) } );
      }
    }
  }

  // Remove advertisements
  removeAdvertisements( arr ) {
    arr.filter(( val ) => {
      return val !== 'ad';
    });
  }

  // Init load
  initLoad() {

    // Checks if some events has been fetched,
    // if not, dispatch an actions that fetched the first 24
    if ( this.props.store.getState().events.fetched ) { this.onStoreChange(); }
    else { this.props.store.dispatch(getFutureEvents(24)); }

  }

  // On Store Change
  onStoreChange() {

    // State
    let state = this.props.store.getState();
    let title = 'Begivenheder';

    // If default data has been fetched
    // Set title using the number of future events
    if ( state.defaultdata.fetched ) {
      let event_count = state.defaultdata.data.future_event_count;
      title = String(event_count)+' begivenheder i Svendborg';
    }


    // Gets all loaded events ids
    let ids = Object.keys( state.events.elements )
      .map(( val ) => { return Number(val); });

    // Sets state (ids) to ALL event ids in the store
    this.setState({ ids, title });

    // Fixes some problems that occur with:
    // multiple events with same id, etc.
    // (Refers to parent)
    this.processScroll();

  }

  // On Scroll
  onScroll(payload) {

    // If not already fetching, check if more fetching is needed
    if (!this.props.store.getState().events.fetching&&
        !this.props.store.getState().events.all_future_fetched) {

      // Extracts data
      let scrollBottom = Number(payload.scrollY) + parseInt(payload.viewCSSProps['height']),
        fromBottom = parseInt(payload.innerViewCSSProps['height']) - scrollBottom;

      // Checks if load more is needed (24 future events)
      if (fromBottom<=600) {
        this.props.store.dispatch(getFutureEvents( 24 ));
      }

    }

  }

  // Component did mount
  componentDidMount() {

    // Subscribes to store
    if ( this.props.store != null ) {
      this.props.store.subscribe(
        this.onStoreChange.bind( this )
      );
    }

    // Initial load
    this.initLoad();

  }

}

// Exports
export default CalendarView;
