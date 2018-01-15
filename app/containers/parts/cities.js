

// Imports
import React from 'react';
import Loader from '../../presentationals/parts/loader.js';

// Actions
import { setCity } from '../../actions/config.js';

// Cities component
class Cities extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      ids : null,
    };
  }

  // Render
  render() {
    return (
      <div className="cities">

        <div className="text">
          <div className="logo">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#towwwn-logo-17">
              </use>
            </svg>
          </div>

          <div className="title">
            Velkommen til Towwn
          </div>

          <div className="sub-title">
            Hvilken by vil du udforske?
          </div>
        </div>

        <div className="cities">

          { this.state.ids != null &&
            this.state.ids.map(this.renderElement.bind(this)) }

        </div>


        { this.state.ids == null &&
          <div className="loading"><Loader /></div> }

        <div className="info">
          Dette kan altid ændres i sidemenuen.
        </div>

      </div>
    );
  }

  // Render element
  renderElement( val ) {

    // Extracts data
    let state = this.props.store.getState();
    let city  = state.cities.data.elements[String(val)];

    // If city exist
    if ( city != null ) {
      return (
        <div className="city" key={ 'city#'+val }
          onClick={ this.onClick.bind(this,val) } >

          <div className="name">
            { city.name != null && city.name }
          </div>

        </div>
      );
    }

    // If city doesn't exist
    else { return <div>Jesus Christ, an error, just lovely..</div> }

  }

  // On Click
  onClick( id ) {

    // Activates on click prop
    if ( this.props.onClick != null ) {
      this.props.onClick();
    }

    // Sets city
    if ( this.props.store != null ) {
      this.props.store.dispatch(setCity(parseInt(id)));
    }

  }

  // On store change
  onStoreChange() {

    // State
    let state = this.props.store.getState();

    // If cities are loaded
    if ( state.cities.data.elements != null ) {

      // Gets the elements and sorts em alphabetically
      let elements = state.cities.data.elements;
      let ids = Object.keys( elements ).sort(( a, b ) => {

        if ( elements[a].name > elements[b].name ) { return 1; }
        if ( elements[b].name < elements[b].name ) { return -1; }
        return 0;

      });

      // Sets state
      this.setState({ ids });

    }

  }

  // Component will mount
  componentWillMount() {
    if ( this.props.store != null ) {

      // Runs on store change to avoid weird errors
      this.onStoreChange();

      // Subscribes
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
export default Cities;
