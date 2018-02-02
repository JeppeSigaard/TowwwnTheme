

// Import
import React from 'react';
import View from '../view.js';
import Railbar from '../../presentationals/railbar.js';

import Place from '../parts/place.js';
import Loader from '../../presentationals/parts/loader.js';

import { shuffle } from '../../tools/array.js';
import { cookies } from '../../tools/cookies.js';

// Place list view
class PlaceListView extends View {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {

      org_ids : [ ],
      ids : [ ],
      sub_category_ids : [ ],

      identification_key : null,
      title : 'Steder',
      id : 'place-list-view',

      sort : 'rnd',
      sub_cat_filter : null,

    };
  }

  // Render
  render() {
    return (
      <View id={this.state.id} title={this.state.title}
        icon="#icon-location" viewBox="0 0 32 32"
        closeProps={[ 'welcome-view','category-view','category-view', 'left', true ]}
        store={ this.props.store }

        topbar={
          <div className="place-list-topbar">
            <div className="sort-btns">

              <div className="sort-btn sort-rnd"
                onClick={ this.sort.bind(this, 'rnd') }>

                <svg viewBox="0 0 20 20">
                  <use xlinkHref="#icon-shuffle">
                  </use>
                </svg>

              </div>

              <div className="sort-btn sort-alp"
                onClick={ this.sort.bind(this, 'alp') }>

                <svg viewBox="0 0 32 32">
                  <use xlinkHref="#icon-alphabetically">
                  </use>
                </svg>

              </div>

            </div>

            <Railbar identificationKey={ this.state.identification_key } elements={
              (this.state.sub_category_ids.map(this.renderSubCat.bind(this)))
            } colorScheme={'secondary'} />

          </div>
        }>

        <div className="place-list" key={ 'places' } >

          {/* Places */}
          { this.state.ids != null && this.state.ids.length>0 &&
            !this.props.store.getState().places.fetching &&
            this.state.ids.map(this.renderElement.bind(this))
          }

          {/* Loader */}
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

  // Render sub category
  renderSubCat( val ) {

    // All places
    if ( val === 'all' ) {
      return (
        <div className="sub-category all" key={this.state.identification_key+'#all'}
          onClick={ this.onSubCatClick.bind(this, 'all') }
          onTouchEnd={ this.onSubCatClick.bind(this, 'all') } >
          Alle
        </div>
      );
    }

    // Extracts data
    let state = this.props.store.getState();
    let cats  = state.categories.elements;

    // Returns
    return (
      <div className="sub-category" key={this.state.identification_key+'#sub-cat#'+val}
        onClick={ this.onSubCatClick.bind(this, cats[val]) }
        onTouchEnd={ this.onSubCatClick.bind(this, cats[val]) } >

        { cats[val].category_name + ' ('+cats[val].location_count+')' }

      </div>
    );

  }

  // Sort
  sort( sort_type ) {

    // Store
    let store = this.props.store;
    if ( store != null ) {

      // Checks sort type
      if ( sort_type == null ) { sort_type = this.state.sort; }

      // Controls cookies
      cookies.setItem( 'sort_method', sort_type, Infinity, '/' );

      // Extracts data
      let state   = store.getState();
      let places  = state.places.elements;
      let ids     = this.state.ids;

      // Checks if citys places are loaded
      if ( places != null ) {

        // Sorts randomly (Shuffles)
        if ( 'rnd' === sort_type ) {
          ids = shuffle( ids );
        }

        // Sorts by name
        if ( 'alp' === sort_type ) {
          ids = ids.sort(( a, b ) => {

            if ( places[a].name > places[b].name ) { return 1; }
            if ( places[a].name < places[b].name ) { return -1; }
            return 0;

          });
        }

      }

      // Sets state
      this.setState({ ids, sort : sort_type });

    }

  }

  // Filter
  filter( filter ) {

    // Store
    let store = this.props.store;
    if ( store != null ) {

      // Checks sort type
      if ( filter == null ) { filter = this.state.sub_cat_filter; }

      // Extracts data
      let state   = store.getState();
      let places  = state.places.elements;
      let ids     = this.state.org_ids.concat([]);

      // Checks if citys places are loaded
      if ( places != null && filter != null ) {
        ids = ids.filter(( val ) => {

          // Gets places cats
          let place_cats = places[val].categories;
          if ( place_cats == null ) { return false; }

          // If categort list contains sub cat
          return ( place_cats.filter(( val ) => {
            return val['category_id'] === filter;
          }) ).length > 0;

        });
      }

      // Sets state
      this.setState({ ids, sub_cat_filter : filter }, () => {
        this.sort();
      });

    }

  }

  // On sub category click
  onSubCatClick( val ) {

    // Gets filter type and sets state
    let filter = ( val === 'all' ) ? null : val['category_id'];
    this.setState({ sub_cat_filter : filter }, () => { this.filter(); });

  }

  // On store change
  onStoreChange() {

    // Extracts data
    let state = this.props.store.getState();
    let shown_cat = state.ui.shown_category;
    let response = { identification_key : shown_cat };

    // Checks if new category has been, yea, set
    if ( shown_cat !== this.state.identification_key ) {
      this.filter();
    }

    // Generates response
    let ids = Object.keys(state.places.elements).filter(( val ) => {

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

    // Sets ids and original ids, if changed (Concat makes sure they aren't references)
    let should_sort = false;
    if ( JSON.stringify(ids) !== JSON.stringify(this.state.org_ids) ) {
      response['ids'] = ids.concat([]);
      response['org_ids'] = ids.concat([]);
      response['sub_cat_filter'] = null;
      should_sort = true;
    }

    // Extracts data
    let cats = state.categories.elements;
    let cat  = cats[shown_cat];

    // Sets title and sub cats
    if ( cat != null ) {

      // Sets title and sub cats
      response['title'] = cat.category_name;
      response['sub_category_ids'] = Object.keys( cats ).filter(( val ) => {
        return ((String(cats[val].category_parent) === String(cat.category_id))) &&
          ( cats[val].location_count > 0 );
      });

      // Adds the all tab at position zero
      response['sub_category_ids'].splice(0,0,'all');

    }

    // Sets state
    this.setState(response, () => {
      if ( should_sort ) {
        this.filter();
      }
    });

  }

  // Component did mount
  componentDidMount() {

    // Subscribess to store
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }

    // Gets cookies sorting methods
    let sortingMethod = cookies.getItem('sort_method');
    if ( sortingMethod == null ) { sortingMethod = 'rnd'; }
    this.setState({ sort : sortingMethod });

  }

}

// Exports
export default PlaceListView;
