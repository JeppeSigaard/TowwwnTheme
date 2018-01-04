

// Import
import React from 'react';
import View from '../../hoc/view.js';

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
      <div className="places" key={ 'places' } >
        Hello World!
      </div>
    );
  }

}

// Exports
export default PlaceListView;
