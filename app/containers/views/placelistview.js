

// Import
import React from 'react';
import View from '../view.js';

import Place from '../parts/place.js';
import Loader from '../../presentationals/parts/loader.js';

// Place list view
class PlaceListView extends View {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      ids : [ ],
      title : 'Steder',
    };
  }

  // Render
  render() {
    return (
      <View id="place-list-view" title={this.state.title}
        icon="#icon-location" viewBox="0 0 32 32"
        closeProps={[ 'welcome-view','category-view','category-view', 'left', true ]}
        store={ this.props.store }>

        <div className="place-list" key={ 'places' } >

          { this.state.ids != null && this.state.ids.length>0 &&
            !this.props.store.getState().places.fetching &&
            this.state.ids.map(this.renderElement.bind(this))
          }

          { ( this.state.ids == null || this.state.ids.length<1 ||
              this.props.store.getState().places.fetching ) &&
            <Loader />
          }

        </div>

      </View>
    );
  }

  // Render element
  renderElement( val ) {
    if ( this.props.store != null ) {

      // Gets state
      let state = this.props.store.getState();

      // Checks if data is loaded
      if ( state.places.data[state.config.city] != null ) {

        // Extracts data
        let place = state.places.data[state.config.city].elements[String(val)];

        // Returns
        return <Place
          element={place}
          store={this.props.store}
          key={'place#'+place.id} />;

      } else { return <div>An error occured</div>; }

    }

  }

  // On store change
  onStoreChange() {

    // Extracts data
    let state = this.props.store.getState();
    let shown_cat = state.ui.shown_category;
    let response = { };

    // Generates response
    if ( state.places.data[state.config.city] != null ) {
      response['ids'] = Object.keys(state.places.data[state.config.city].elements)
        .filter(( val ) => {

          // Checks if place has category, returns.
          let cats = state.places.data[state.config.city].elements[val].categories;
          if ( cats == null ) { return false; }

          for ( let n = 0; n < cats.length; n++ ) {
            if ( String(cats[n]['category_id']) == String(shown_cat) ) {
              return true;
            }
          }

          // If not, return false.
          return false;

        });

        // Category name found, view title set.
        let cat = state.categories.elements[shown_cat];
        if ( cat != null ) { response['title'] = cat.category_name; }

        // Sets state
        this.setState(response);

      }
    }

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }
  }

}

// Exports
export default PlaceListView;
