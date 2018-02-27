

// Imports
import React from 'react';

// Actions
import { setShownCategory } from '../../actions/ui/shownelements.js';
import { setViewFocus } from '../../actions/ui/views.js';
import { getPlaces } from '../../actions/api/places.js';


// Category component
class Category extends React.Component {

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
      <div className={ 'category' + ( this.state.bookmarked ? ' bookmark-mode' : '' ) }
        onClick={ this.onClick.bind(this) } >

        <div className="category-place-count">
          { this.props.element != null &&
            this.props.element.location_count
          }
        </div>

        <div className="category-title">
          { this.props.element != null &&
            this.props.element.category_name
          }
        </div>

        { this.props.element != null &&
          <div className="category-subs">
            { this.props.element.subcategory_count + '  underkategorier' }
          </div>
        }

      </div>
    );
  }

  // On click
  onClick() {
    if ( this.props.store != null ) {

      // Gets places from category
      this.props.store.dispatch(getPlaces(
        null,this.props.element['category_id']));

      // Sets shown category
      this.props.store.dispatch(setShownCategory(
        this.props.element['category_id'] ));

      // Sets view focus
      this.props.store.dispatch(setViewFocus(
        'category-view', 'place-list-view', 'place-list-view',
        'right', true
      ));

    }
  }

  // On store change
  onStoreChange() {

    // Fields
    let state = this.props.store.getState();
    let new_state = { };

    let shown_cat = String(state.shownelements.shown_category);
    let views = [state.views.leftview, state.views.rightview];

    // Sets bookmarked part of state
    if ( shown_cat == String(this.props.element['category_id']) &&
      ( views[0] === 'place-list-view' || views[1] === 'place-list-view' )) {
      new_state['bookmarked'] = true;
    } else { new_state['bookmarked'] = false; }

    // Sets state
    this.setState(new_state);

  }

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }
  }

}

// Export
export default Category;
