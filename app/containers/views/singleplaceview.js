

// Imports
import React from 'react';
import View from '../../hoc/view.js';

// Single place view component
class SinglePlaceView extends View {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {

      id : 'single-place-view',
      title : 'Sted',
      icon : '#icon-location',
      viewBox : '0 0 32 32',

    };
  }

  // Render
  render() {
    return this.generateRender(
      <div classname="singleplace">
        Hello World!
      </div>
    );
  }

}

// Exports
export default SinglePlaceView;
