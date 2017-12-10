

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
        { this.state.ids.map( this.renderElement.bind(this) ) }
      </div>
    );
  }

  // Render Element
  renderElement( id ) {

    // Extracts data
    let event = this.props.store.getState().events.elements[String( id )];
    if ( event == null ) { return (<div>An error occured</div>); }

    // Returns jsx
    return ( <Event title={event['title']} key={ 'calendar-event#'+id } /> );

  }

  // On Store Change
  onStoreChange() {

    // Sets state (ids) to ALL event ids in the store
    this.setState({ ids :

      // Gets ids
      Object.keys( this.props.store.getState().events.elements )
        .map(( val ) => { return Number( val ); })

    });

  }

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(
        this.onStoreChange.bind( this )
      );
    }

    // tmp
    this.props.store.dispatch(getFutureEvents(50));

  }

}

// Exports
export default View( CalendarView )
( 'calendarview', 'Begivenheder' );
