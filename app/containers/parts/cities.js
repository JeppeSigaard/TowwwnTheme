

// Imports
import React from 'react';

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
          <div className="title">
            <div className="logo">
              <svg viewBox="0 0 32 32">
                <use xlinkHref="#towwwn-logo-17">
                </use>
              </svg>
            </div>

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

  }

  // On store change
  onStoreChange() {

    // State
    let state = this.props.store.getState();

    // If cities are loaded
    if ( state.cities.data.elements != null ) {

      // Extracts data
      let ids = Object.keys( state.cities.data.elements );

      // Sets state
      this.setState({ ids });

    }

  }

  // Component will mount
  componentWillMount() {
    if ( this.props.store != null ) {
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
