

// Imports
import React from 'react';

import { setViewFocus } from '../../actions/ui/views.js';
import { setShownSingleEvent } from '../../actions/ui/shownelements.js';
import { formatDate, decodeEntities } from '../../tools/formatters.js';

// Event component
class Event extends React.Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      imgUrl : '',
      timStr : '',
      bookmarked : '',
    };
  }

  // Render
  render() {
    return (
      <div className={ 'event' + ( this.props.large?' large':'' ) + 
        ( this.state.bookmarked ? ' bookmark-mode' :' ' ) }
      onClick={ this.onClick.bind(this) } >

        {/* Head */}
        <header className="event-head">
          <div className="event-image"
            style={{ 'backgroundImage' : 'url('+this.state.imgUrl+')' }} >
          </div>
        </header>

        {/* Body */}
        <div className="event-body">
          <div className="title">
            { this.props.element['title'] != null &&
              decodeEntities(this.props.element['title']) }
          </div>

          <div className="time">
            { this.state.timStr }
          </div>
        </div>

        {/* Footer */}
        <footer className="event-footer">
          <div className="event-place">
            { this.props.element['parentname'] != null &&
              decodeEntities(this.props.element['parentname']) }
          </div>
        </footer>

      </div>
    );
  }

  // On click
  onClick() {

    // Sets shown single event
    if ( this.props.store != null ) {

      // Sets shown event
      this.props.store.dispatch(setShownSingleEvent(this.props.element['id']));

      // Sets view focus
      this.props.store.dispatch(setViewFocus(
        'calendar-view', 'event-view', 'event-view', 'right', true));

    }

  }

  // Extract data
  extractData( props ) {
    if ( props == null ) { props = this.props; }

    // Optimization:
    // Gets smallest image above 200px width
    let orgUrl = props.element.images, imgUrl = null;
    for ( let key of Object.keys( orgUrl ) ) {
      if ( !isNaN( key ) && Number(key) >= 200 ) {
        imgUrl = orgUrl[key];
      }
    }

    // No images above 200px?
    // Take the smallest
    if ( imgUrl == null && Object.keys(orgUrl).length > 0 ) {
      imgUrl = orgUrl[Object.keys(orgUrl)[0]];
    }

    // Still no?
    // Well, then just dont take any
    if ( imgUrl == null ) { imgUrl = ''; }

    // Sets the time string state day...
    // Omg, hade this piece, its messy as fuck..
    // Just overlook it.. Seriously.. :))
    let end = props.element.end_time != null ?
        new Date(props.element.end_time) : null,
      sta = new Date(props.element.start_time),
      now = new Date(),
      timStr = '';

    // On going event
    if ( end != null && now.getTime() < end.getTime() && now.getTime > end.getTime() ) {

      timStr += 'Nu';

    // Future event
    } else { timStr = formatDate(sta, false); }

    // Sets state
    this.setState({ imgUrl, timStr, bookmarked : this.bookmarked() });

  }

  // Checks if bookmarked
  bookmarked() {
    if ( this.props.store != null ) {

      // Fields
      let state = this.props.store.getState(),
        shown_event = String(state.shownelements.shown_single_event),
        views = [state.views.leftview, state.views.rightview];

      // Checks
      if ( shown_event == String(this.props.element['id'])
        && ( views[0] === 'event-view' || views[1] === 'event-view' )) {
        return true;
      } else {
        return false;
      }

    } else { return false; }
  }

  // Life cycle events
  componentWillReceiveProps(nextProps) { this.extractData(nextProps); }
  componentWillMount() {
    this.extractData(this.props);

    if ( this.props.store != null ) {
      this.props.store.subscribe(this.extractData.bind(this, this.props));
    }
  }

}

// Exports
export default Event;
