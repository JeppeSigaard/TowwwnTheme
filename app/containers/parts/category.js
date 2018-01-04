

// Imports
import React from 'react';
import { setShownCategory, setViewFocus } from '../../actions/ui.js';

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
      <div className={"category "+(this.state.bookmarked?'bookmark-mode':'')}
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

        <div className="category-subs">
          { this.props.element != null &&
            this.props.element.subcategory_count + '  kategorier'
          }
        </div>

      </div>
    );
  }

  // On click
  onClick() {
    if ( this.props.store != null ) {

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
    let shown_cat = String(state.ui.shown_category);
    let views = [state.ui.viewrelated.leftview, state.ui.viewrelated.rightview];

    // Sets bookmarked part of state
    if ( shown_cat == String(this.props.element['category_id']) &&
      ( views[0] === 'place-list-view' || views[1] === 'place-list-view' )) {
        this.setState({ bookmarked : true });
    } else { this.setState({ bookmarked : false }); }

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
