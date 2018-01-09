

// Imports
import React from 'react';
import { renderDynamicOpenTimes } from '../../tools/formatters.js';

// Action
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

          { this.props.element.hours != null &&
            <div className="open-hours">
              { renderDynamicOpenTimes(this.props.element.hours) }
            </div>
          }

          <div className="adress">{ this.props.element.adress }</div>
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
