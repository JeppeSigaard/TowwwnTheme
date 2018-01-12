

// Imports
import React from 'react';
import View from '../view.js';
import Category from '../parts/category.js';

// Actions
import { getCategories } from '../../actions/api/categories.js';


// Category view component
class CategoryView extends View {

  // Constructor
  constructor( props ) {
    super(props);
    this.state = {
      ids : [ ],
      place_count : 0,
      title : 'Lokale steder',
    };
  }

  // Render
  render() {
    return (
      <View id="category-view" title={this.state.title}
        icon="#icon-location" viewBox="0 0 32 32"
        store={ this.props.store }>

        <div className="place-categories" key={ 'category-view' }>
          { this.state.ids.map(this.renderElement.bind(this)) }
        </div>

      </View>
    );
  }

  // Render element
  renderElement( val ) {

    // Gets state and returns
    let state = this.props.store.getState();
    return <Category element={ state.categories.elements[String(val)] }
        store={ this.props.store }
        key={ 'plain-category#'+val } />

  }

  // On store change
  onStoreChange() {

    // Gets state and creates response field
    let state = this.props.store.getState();
    let response = { };

    // Checks if city has changes
    if ( state.config.city != this.cCity ) {
      this.cCity = state.config.city;
      this.props.store.dispatch(getCategories());
    }

    // Extracts data
    // Places count
    if ( state.defaultdata.data.place_count != null ) {
      response.place_count = state.defaultdata.data.place_count;
      response.title = response.place_count+' lokale steder';
    }

    // Categories
    let cats = state.categories.elements;


    // Gets categories ids
    // And performs a filter and sort on them
    response['ids'] = Object.keys(state.categories.elements)

      // Filter sub categories
      // and empty out
      .filter(( val ) => {
        return cats[val].category_parent === 0 &&
          cats[val].location_count !== 0;
      })

      // Sorts it alphab.
      .sort(( a, b ) => {

        // Ignore casing
        a = cats[a].category_name.toUpperCase();
        b = cats[b].category_name.toUpperCase();

        // Comparison
        if ( a > b ) { return 1; }
        if ( a < b ) { return -1; }
        return 0;

      });


    // Sets state
    this.setState(response);

  }

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {

      // Subscribes to store & loads categories
      this.props.store.subscribe( this.onStoreChange.bind(this) );
      this.props.store.dispatch(getCategories());

    }
  }

}

// Exports
export default CategoryView;
