

// Imports
import React from 'react';
import { setViewFocus, setShownSinglePlace } from '../../actions/ui.js';

// Place component
class Place extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      bookmarked : false,
    };
  }

  // Render
  render() {
    return (
      <div className={"place "+(this.state.bookmarked?'bookmark-mode':'')}
        onClick={ this.onClick.bind(this) } >

        {/* Icon */}
        <div className="place-icon" style={{ backgroundImage : 'url(' +
          this.props.element.picture + ')' }} >
        </div>

        {/* Left sided text */}
        <div className="place-leftsided-text">
          <div className="title">{ this.props.element.name }</div>
          <div className="adress">{ this.props.element.adress }</div>

          { this.props.element.hours != null &&
            this.renderOpen(this.props.element.hours)
          }

        </div>

        {/* Call to action icons */}
        <div className="small-cta-icons">

          { this.props.element.hours != null &&
            <div className="phone small-cta-icon">
              <svg viewBox="0 0 32 32">
                <use xlinkHref="#icon-watch">
                </use>
              </svg>
            </div>
          }

          { this.props.element.phone != null &&
            <div className="phone small-cta-icon">
              <svg viewBox="0 0 32 32">
                <use xlinkHref="#icon-phone">
                </use>
              </svg>
            </div>
          }

          { this.props.element.website != null &&
            <div className="web small-cta-icon">
              <svg viewBox="0 0 32 32">
                <use xlinkHref="#icon-web">
                </use>
              </svg>
            </div>
          }

          { this.props.element.adress != null &&
            <div className="web small-cta-icon">
              <svg viewBox="0 0 32 32">
                <use xlinkHref="#icon-location">
                </use>
              </svg>
            </div>
          }

          <div className="facebook small-cta-icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-facebook">
              </use>
            </svg>
          </div>

        </div>

      </div>
    );
  }

  // Render open
  renderOpen( val ) {

    // Gets the json from val and creates a dat
    let json = JSON.parse( val );
    let date = new Date();

    // Comparisons dates
    let comparisonDate_from = new Date();
    let comparisonDate_to = new Date();

    // Sets a constant of days
    const days = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];

    // No hours found at all, they're closed.
    if ( json.constructor.name === 'Array' &&
         json.length == 0 ) { return ''; }

    // Gets todays data
    let todaysdata = json[days[date.getDay()]];
    if ( todaysdata == null ) { return 'Lukket for idag'; }

    // Gets from and to
    let from_text = json[days[date.getDay()]][0];
    let to_text   = json[days[date.getDay()]][1];

    // From hours and minutes
    let from_hours   = parseInt(from_text.slice(0,2));
    let from_minutes = parseInt(from_text.slice(3,5));

    // To hours and minutes
    let to_hours   = parseInt(to_text.slice(0,2));
    let to_minutes = parseInt(to_text.slice(3,5));

    // Sets from comparison date
    comparisonDate_from.setHours(from_hours);
    comparisonDate_from.setMinutes(from_minutes);

    // Sets to comparison date
    comparisonDate_to.setHours(to_hours);
    comparisonDate_to.setMinutes(to_hours);

    // Gets time
    let now  = date.getTime();
    let from = comparisonDate_from.getTime();
    let to   = comparisonDate_to.getTime();

    // Returns
    if ( now >= to ) { return 'Lukket for idag'; }
    else if ( now < from ) { return 'Åbent senere ' + from_text + ' - ' + to_text; }
    else { return 'Åbent ' + from_text + ' - ' + to_text; }

  }

  // On click
  onClick() {
    if ( this.props.store != null ) {

      // Changes shown place
      this.props.store.dispatch(setShownSinglePlace(
        this.props.element.id
      ));

      // Changes view focus
      this.props.store.dispatch(setViewFocus(
        'place-list-view', 'single-place-view', 'single-place-view',
        'right', true
      ));

    }
  }

  // On store change
  onStoreChange() {

    // Fields
    let state = this.props.store.getState();
    let shown_place = String(state.ui.shown_single_place);
    let views = [state.ui.viewrelated.leftview, state.ui.viewrelated.rightview];

    // Sets bookmarked part of state
    if ( shown_place == String(this.props.element['id']) &&
      ( views[0] === 'single-place-view' || views[1] === 'single-place-view' )) {
        this.setState({ bookmarked : true });
    } else { this.setState({ bookmarked : false }); }

  }

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.unsubscribeStore = this.props.store.subscribe(
        this.onStoreChange.bind(this));
    }
  }

  // Component will unmount
  componentWillUnmount() {
    if ( this.unsubscribeStore != null ) {
      this.unsubscribeStore();
    }
  }

}

// Exports
export default Place;
