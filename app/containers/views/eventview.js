

// Imports
import React from 'react';

// Components
import View from '../view.js';
import FullSizeEvent from '../parts/fullsizeevent.js';

// Actions & tools
import { getSinglePlace } from '../../actions/api/places.js';
import { decodeEntities } from '../../tools/formatters.js';

// Event view component
class EventView extends View {

  // Constructor
  constructor() {
    super();
    this.state = {

      event  : null,
      imgUrl : null,
      hours  : null,

      id : 'event-view',
      title : 'Begivenhed',

    };
  }

  // Render
  render() {

    return (
      <View id={ this.state.id } title={ decodeEntities(this.state.title) }
        icon="#icon-event" viewBox="0 0 32 32"
        onClose={ this.onClose.bind(this) }
        closeProps={[ 'sidebar','calendar-view','calendar-view', 'left', true ]}
        store={ this.props.store }>

        <FullSizeEvent
          onEventChange={this.resetScroll.bind(this, true)}
          store={ this.props.store }
          event={ this.state.event }
          imgUrl={ this.state.imgUrl }
          hours={ this.state.hours }
        />

      </View>
    );
  }

  // Reset scroll
  resetScroll( withTrans ) {

    // Gets view, its transition time and scroll down.
    let scroller  = document.querySelectorAll('#'+this.state.id+' .scroller')[0];
    let trans = parseFloat(window.getComputedStyle(scroller).transitionDuration ) * 1000;
    setTimeout(() => { scroller.scrollTo( 0, 0 ); }, withTrans ? trans:0 );

  }

  // On close
  onClose() {
    this.resetScroll(true);
  }

  // On store change
  onStoreChange() {

    // Gets state
    const state = (this.props.store.getState());

    // Sets event
    let shownevent = state.shownelements.shown_single_event;
    if ( shownevent != null ) {

      // Gets event
      let event = state.events.elements[String(shownevent)];
      if ( event !== this.state.event ) {
        this.resetScroll();

        if (this.props.onEventChange != null ) {
          this.props.onEventChange(false);
        }
      }

      // Gets smallest event image above 400px
      let imgUrl = event.images[(Object.keys(event.images).filter(( size ) => {
        return parseInt(size) > 600;
      }))[0]];

      // If no image above 400px found, take largest there is
      if ( imgUrl == null ) {
        imgUrl = event.images[Object.keys(event.images)[Object.keys(event.images).length-1]];
      }

      // If parent not loaded,
      // well, fetch it!:))
      let parent = state.places.elements[event['parentid']];
      if ( parent == null && !state.places.fetching ) {
        this.props.store.dispatch(getSinglePlace(event['parentid']));
      }

      // Else? set hours.
      let hours = null;
      if ( parent != null ) {
        let tmphours = JSON.parse( parent['hours'] );
        if ( tmphours != null && Object.keys(tmphours).length>=1 ) {
          hours = tmphours;
        }
      }

      // Sets new state
      // Callback included
      // to get siblings
      this.setState({
        event, imgUrl, hours,
        title : event['title']
      });

    }
  }

  // Component will mount
  componentWillMount() {

    // Subsribes to store
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }

  }

}

// Exports
export default EventView;
