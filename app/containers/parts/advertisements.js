

// Imports
import React from 'react';
import Advertisement from '../../presentationals/advertisement.js';

// Advertisements (Plural) component
class Advertisements extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      ads : [ ],
    };
  }

  // Render
  render() {
    return (
      <div className="advertisements">
        { this.state.ads.map(this.renderAdvertisement.bind(this)) }
      </div>
    );
  }

  // Render advertisement
  renderAdvertisement( val ) {
    return (
      <Advertisement
        key={ this.props.keyPrefix+'-ad#'+val['id'] }
        element={val} />
    );
  }

  // On store change
  onStoreChange() {

    // Extracts data
    let state = this.props.store.getState();
    let ads = state.advertisements.elements;

    // Sets state
    if ( ads != null ) { this.setState({ ads }); }

  }

  // Component will mount
  componentWillMount() {
    if ( this.props.store != null ) {

      // Subsribes to store
      this.unsubscribe = this.props.store.subscribe(
        this.onStoreChange.bind(this));

      // Runs on store change immediately
      this.onStoreChange();

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
export default Advertisements;
