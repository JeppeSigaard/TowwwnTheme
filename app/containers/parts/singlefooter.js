

// Imports
import React from 'react';
import Advertisements from './advertisements.js';

// Actions
import { getSinglePlace } from '../../actions/api/places.js';


// Single Footer component
class SingleFooter extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      element : null,
      hours : null,
    };
  }

  // Render
  render() {
    return (
      <footer className="single-footer">
        { this.state.element != null && <div className="single-footer-inner">

          {/* Parent */}
          <div className="parent row">
            <div className="image" style={{ backgroundImage :
              'url(' + this.state.element['picture'] + ')' }}>
            </div>

            <div className="text">
              { this.state.element['name'] }
            </div>
          </div>

          {/* Hours */}
          { this.state.hours != null &&
            <a className="hours row">
              <div className="icon">
                <svg viewBox="0 0 32 34">
                  <use xlinkHref="#icon-watch"></use>
                </svg>
              </div>

              <div className="text">

                { Object.keys(this.state.hours)
                  .map(this.renderHours.bind(this)) }

              </div>
            </a>
          }

          {/* Phone */}
          { this.state.element['phone'] != null &&
            <a className="phone row" href={'tel://'+this.state.element['phone']}>
              <div className="icon">
                <svg viewBox="0 0 32 32">
                  <use xlinkHref="#icon-phone"></use>
                </svg>
              </div>

              <div className="text">
                { this.state.element['phone'] }
              </div>
            </a>
          }

          {/* Facebook */}
          { this.state.element['fbid'] != null &&
            <a className="facebook row" target="_blank"
              href={'http://fb.com/'+this.state.element['fbid']}>
              <div className="icon">
                <svg viewBox="0 0 32 32">
                  <use xlinkHref="#icon-facebook"></use>
                </svg>
              </div>

              <div className="text">Facebook</div>
            </a>
          }

          {/* Website */}
          { this.state.element['website'] != null &&
            <a className="web row" target="_blank"
              href={this.state.element['website']}>
              <div className="icon">
                <svg viewBox="0 0 32 32">
                  <use xlinkHref="#icon-web"></use>
                </svg>
              </div>

              <div className="text">
                { this.state.element['website'] }
              </div>
            </a>
          }

          {/* Adress */}
          { this.state.element['adress'] != null &&
            <a className="adress row" target="_blank"
              href={'https://www.google.dk/maps/place/'+this.state.element['adress']}>
              <div className="icon">
                <svg viewBox="0 0 32 32" >
                  <use xlinkHref="#icon-location"></use>
                </svg>
              </div>

              <div className="text">
                { this.state.element['adress'] }
              </div>
            </a>
          }

        </div> }

        {/* Advertisements */}
        <Advertisements store={ this.props.store } />

      </footer>
    );
  }

  // Render hours
  renderHours( day ) {

    // Preset fields
    const days = {
      'mon' : 'Mandag',
      'tue' : 'Tirsdag',
      'wed' : 'Onsdag',
      'thu' : 'Torsdag',
      'fri' : 'Fredag',
      'sat' : 'Lørdag',
      'sun' : 'Søndag',
    };

    // Returns
    return (
      <div className="hours-row" key={'single-event-hours-day#'+day}>
        { days[day] + ':' }

        <div className="time">
          { this.state.hours[day][0] + ' - ' +
            this.state.hours[day][1] }
        </div>
      </div>
    );

  }

  // On store change
  updateHours( props ) {

    // Extracts data and creates response field
    let element = props.element;
    let elementType = props.elementType;
    let hours = null;

    // Event
    if ( 'event' === elementType ) {

      // Extracts data
      let state = this.props.store.getState();

      // If parent not loaded,
      // well, fetch it!:))
      let parent = state.places.elements[this.props.element['parentid']];
      if ( parent == null && !state.places.fetching ) {
        this.props.store.dispatch(getSinglePlace(this.props.element['parentid']));
      }

      // Else? set hours.
      if ( parent != null ) {
        let tmphours = JSON.parse( parent['hours'] );
        if ( tmphours != null && Object.keys(tmphours).length>=1 ) {
          hours = tmphours;
        }
      }

    }

    // Place
    else if ( 'place' === elementType && JSON.parse(element['hours']).length!==0 ) {
      hours = JSON.parse( element['hours'] );
    }

    // Sets state
    this.setState({ hours });

  }

  // Update state
  updateState( props ) {

    // Extracts data
    let element = props.element;
    let elementType = props.elementType;

    // Error handling
    if ( element == null || elementType == null ) { return; }

    // Generate state
    let new_element = {
      fbid : element['fbid'],
      phone : element['phone'],
      website : element['website'],
      adress : element['adress'],
    };

    // Type specific properties
    if ( 'event' == elementType ) {

      // Sets picture n' name
      new_element['picture'] = element['parentpicture'];
      new_element['name'] = element['parentname'];

    } else if ( 'place' == elementType ) {

      // Sets picture n' name
      new_element['picture'] = element['picture'];
      new_element['name'] = element['name'];

    }

    // Sets state
    this.setState({ element : new_element }, this.updateHours.bind(this, props));

  }

  // Component will receive props n' did mount
  componentWillReceiveProps( props ) { this.updateState( props ); }
  componentDidMount() { this.updateState( this.props ); }

}

// Exports
export default SingleFooter;
