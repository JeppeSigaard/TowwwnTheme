

// Import
import React from 'react';
import View from '../../hoc/view.js';

import Place from '../parts/place.js';
import Loader from '../../presentationals/parts/loader.js';

// Place list view
class PlaceListView extends View {

  // Constructor
  constructor(props) {

    super(props);
    this.state = {

      ids : [ ],
      id : 'place-list-view',
      title : 'Steder',
      icon : '#icon-location',
      viewBox : '0 0 32 32',
      closeProps : [
        'welcome-view','category-view','category-view',
        'left', true
      ],

    };

  }

  // Render
  render() {
    return this.generateRender(
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
    );
  }

  // Render element
  renderElement( val ) {
    if ( this.props.store != null ) {

      // Extracts data
      let state = this.props.store.getState();
      let place = state.places.elements[String(val)];

      // Returns
      return <Place
        element={place}
        store={this.props.store}
        key={'place#'+place.id} />;

    }
  }

  // On store change
  onStoreChange() {

    // Extracts data
    let state = this.props.store.getState();
    let shown_cat = state.ui.shown_category;
    let response = { };

    // Generates response
    response['ids'] = Object.keys(state.places.elements).filter(( val ) => {

      // Checks if place has category, returns.
      let cats = state.places.elements[val].categories;
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

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }
  }

}

// Exports
export default PlaceListView;
