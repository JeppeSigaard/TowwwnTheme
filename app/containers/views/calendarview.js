

// Imports
import React from 'react';
import View from '../../hoc/view.js';

// Components
import Event from '../../presentationals/event.js';

// Actions
import { getFutureEvents } from '../../actions/api/events.js';

// Calendar view component
class CalendarView extends React.Component {

  // Constructor
  constructor( props ) {
    super( props );
    this.state = {
      ids : [ ],
    };
  }

  // Render
  render() {
    return (
      <div className="calendar">
        { (this.preprocess.call(this, this.state.ids))
          .map( this.renderElement.bind(this) ) }
      </div>
    );
  }

  // Render Element
  renderElement( id ) {

    // Extracts data
    let event = this.props.store.getState().events.elements[String( id )];
    if ( event == null ) { return (<div>An error occured</div>); }

    // Returns jsx
    return ( <Event element={event} key={ 'calendar-event#'+id } /> );

  }

  // Preprocess: Sorts & filters events.
  // Important: This needs to be a pure function, and use immutable data
  preprocess( ids ) {

    // Is the store defined?
    if ( this.props.store != null ) {

      // State events
      const events = this.props.store.getState().events.elements;

      // Filters away old events
      let resp = ids.filter(( val ) => { val = String(val);
        return (new Date(events[val].start_time)).getTime() > (new Date()).getTime();
      });

      // Sorts event based on time
      resp.sort(( a, b ) => { a = String(a); b = String(b);
        return events[a].start_time > events[b].start_time;
      });

      // Returns response
      return resp;

    }

    // Default response
    return ids;

  }


  // On Store Change
  onStoreChange() {

    // Gets all loaded events ids
    let ids = Object.keys( this.props.store.getState().events.elements )
      .map(( val ) => { return Number(val); });

    // Sets state (ids) to ALL event ids in the store
    this.setState({ ids });

  }

  // Component did mount
  componentDidMount() {

    // Subscribes to store
    if ( this.props.store != null ) {
      this.props.store.subscribe(
        this.onStoreChange.bind( this )
      );
    }

    // tmp
    this.props.store.dispatch(getFutureEvents(24));

  }

}

// Exports
export default View( CalendarView )
( 'calendarview', 'Begivenheder' );
