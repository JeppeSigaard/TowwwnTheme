

// Imports
import { setMobileMode } from '../actions/ui.js';

// View Handler
class ViewHandler {

  // Constructor
  constructor( store ) {

    // Error handling
    if (store==null) {return false;}

    // Runs init positioning
    if ( window.innerWidth > 640 ) { this.updateViewPositioningLargeScreen(store); }
    else { this.updateViewPositioningSmallScreen(store); }

    // Store subscription
    store.subscribe((e) => { this.processStoreChange(store); });

    // Resize event
    window.addEventListener('resize',this.onResize.bind(this, store));
    this.onResize( store );

  }

  // On resize
  onResize( store ) {
    if ( window.innerWidth >= 640 &&
      store.getState().ui.mobile ) {

      // Not mobile.. Any more
      store.dispatch(setMobileMode(false));

    } else if ( window.innerWidth < 640 &&
      !store.getState().ui.mobile ) {

      // Mobile now!
      store.dispatch(setMobileMode(true));

    }
  }

  // Process store change
  processStoreChange( store ) {

    if ( store.getState().ui != null && store.getState().ui.mobile ) { // Mobile
      this.updateViewPositioningSmallScreen(store);
    } else { // !Mobile
      this.updateViewPositioningLargeScreen(store);
    }

  }

  // Update view positioning small screen
  updateViewPositioningSmallScreen( store ) {

    // Extracts data
    // let state = store.getState(),
    //   transition = state.ui.viewrelated.transition,
    //   mview_id  = state.ui.viewrelated.mview,
    //   x_mview_id  = state.ui.viewrelated.x_mview;

  }

  // Update view positioning large screen
  updateViewPositioningLargeScreen( store ) {

    // Extracts data
    let state = store.getState(),
      transition = state.ui.viewrelated.transition,
      leftview_id  = state.ui.viewrelated.leftview,
      rightview_id = state.ui.viewrelated.rightview,
      x_leftview_id  = state.ui.viewrelated.x_leftview,
      x_rightview_id = state.ui.viewrelated.x_rightview;

    // Check
    if ( this.lastViews != null &&
      this.lastViews[0] === leftview_id &&
      this.lastViews[1] === rightview_id ) {
     return false;
    }

    // Last views
    this.lastViews = [ leftview_id, rightview_id ];

    // Elements
    let leftview = document.getElementById(leftview_id),
      rightview = document.getElementById(rightview_id),
      x_leftview = document.getElementById(x_leftview_id),
      x_rightview = document.getElementById(x_rightview_id);

    // Lists
    let views = [leftview, rightview, x_leftview, x_rightview],
      n_views = [leftview, rightview],
      x_views = [x_leftview, x_rightview];

    // Error handling
    if ( leftview == null || rightview == null ||
       ( leftview_id === rightview_id )) {

      // Returns
      return false;

    }

    // Preposition & removes positioning classes
    this.prePosition(...views);
    this.removePositioningClasses();

    // Adds | removes transition classes
    if ( transition )  { this.addTransClass(views); }
    if ( !transition ) { this.rmTransClass(views); }

    // Initial
    if ( x_leftview_id == null || x_rightview_id == null ) {
      leftview['style'].left  = "0%";
      rightview['style'].left = "50%";
    }

    // From left
    if ( rightview_id === x_leftview_id ) {
      leftview['style'].left  = "0%";
      rightview['style'].left = "50%";

      if ( x_rightview != null ) {
        x_rightview['style'].left = "100%";
      }
    }

    // From right
    if ( leftview_id === x_rightview_id ) {
      leftview['style'].left  = "0%";
      rightview['style'].left = "50%";

      if ( x_leftview != null ) {
        x_leftview['style'].left = "-50%";
      }
    }

    // Add positioning classes
    leftview.classList.add('leftview');
    rightview.classList.add('rightview');

    // Returns
    return true;

  }

  // Pre position (All args are the ids)
  prePosition( leftview, rightview, x_leftview, x_rightview ) {

    // Views (plural)
    let views = [leftview, rightview];

    // Removes transition classes
    // and forces CSS queue to execute
    this.rmTransClass(views);
    this.forceQueueExecution(views);

    // Left view equals old right
    if ( leftview === x_rightview ) {
      rightview['style'].left = "100%"; }

    // Right view equals old left
    if ( rightview === x_leftview ) {
      leftview['style'].left = "-50%"; }

    // Force queue execution
    this.forceQueueExecution(views);

  }

  // Add trans class
  addTransClass( views ) {

    // Adds the trans class
    // to all elems in array
    for ( let n = 0; n < views.length; n++ ) {
      if ( views[n] != null ) {
        views[n].classList.add('trans');
      }
    }

    // Forces queue execution
    this.forceQueueExecution(views);

  }

  // Remove trans class
  rmTransClass( views ) {

    // Removes the trans class
    // from all elems in array
    for ( let n = 0; n < views.length; n++ ) {
      if ( views[n] != null ) {
        views[n].classList.remove('trans');
      }
    }

    // Force queue execution
    this.forceQueueExecution(views);

  }

  // Force queue
  forceQueueExecution( views ) {

    // Forces CSS queue to run
    // on all elems in array
    for ( let n = 0; n < views.length; n++ ) {
      if ( views[n] != null ) {
        let oh = views[n].offsetHeight; // <- forces queue to run
      }
    }

  }

  // Remove positioning classes
  removePositioningClasses() {

    // Gets elements
    let leftviews  = document.getElementsByClassName('leftview');
    let rightviews = document.getElementsByClassName('rightview');

    // Removes left view classes
    for ( let n = 0; n < leftviews.length; n++ ) {
      leftviews[n].classList.remove('leftview');
    }

    // Removes right view classes
    for ( let n = 0; n < rightviews.length; n++ ) {
      rightviews[n].classList.remove('rightview');
    }

  }

}

// Exports
export default ViewHandler;
