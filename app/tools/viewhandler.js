

// Imports
import { setMobileMode } from '../actions/ui/mobile.js';

// View Handler
class ViewHandler {

  // Constructor
  constructor( store ) {

    // Error handling
    if (store==null) {return false;}

    // Runs init positioning
    if ( window.innerWidth > 800 ) { this.updateViewPositioningLargeScreen(store); }
    else { this.updateViewPositioningSmallScreen(store); }

    // Store subscription
    store.subscribe(( ) => { this.processStoreChange(store); });

    // Resize event
    window.addEventListener('resize',this.onResize.bind(this, store));
    this.onResize( store );

    // Creates copy of viewrelated state
    this.l_viewrelated = store.getState().views;

  }

  // On resize
  onResize( store ) {
    if ( window.innerWidth >= 800 &&
      store.getState().mobile.isMobile ) {

      // Not mobile.. Any more
      store.dispatch(setMobileMode(false));

    } else if ( window.innerWidth < 800 &&
      !store.getState().mobile.isMobile ) {

      // Mobile now!
      store.dispatch(setMobileMode(true));

    }
  }

  // Process store change
  processStoreChange( store ) {

    // if last view related is not equal to current
    if ( this.l_viewrelated != store.getState().views.l_viewrelated ) {
      if ( store.getState().mobile.isMobile ) {

        // Mobile
        if ( !this.ongoing ) {
          this.ongoing = true;
          this.updateViewPositioningSmallScreen(store);
        }

      } else {

        // !Mobile
        this.updateViewPositioningLargeScreen(store);

      }
    }

    // Changes last viewrelated
    this.l_viewrelated = store.getState().views;

  }

  // Update view positioning small screen
  updateViewPositioningSmallScreen( store ) {

    // Extracts data
    let state = store.getState(),
      transition = state.views.transition,
      mview_id  = state.views.mview,
      x_mview_id  = state.views.x_mview,
      from = state.views.from;

    // Not mobile last
    if ( this.l_viewrelated != null && !this.l_viewrelated.mobile ) {

      // Sets transition to false
      transition = false;

      // Gets all views and positions them
      let views = document.getElementsByClassName('view');
      for ( let n = 0; n < views.length; n++ ) {
        views[n].style.left = '-100%';
      }

    }

    // Get elements
    let mview = document.getElementById( mview_id ),
      x_mview = document.getElementById( x_mview_id );

    // Sets views (plural)
    let views = [mview];
    if ( x_mview != null ) { views.push( x_mview ); }

    // Pre positions view
    this.prePositionSmallScreen( mview, x_mview, from );

    // Add trans classes
    if ( transition ) { this.addTransClass(views); }
    if ( !transition ) { this.rmTransClass(views); }

    // Positions views
    if ( x_mview != null ) {
      if ( 'left' === from ) { x_mview.style.left = '100%'; }
      if ( 'right' === from ) { x_mview.style.left = '-100%'; }
    }

    mview.style.left = '0%';

    // Handles throttling when transition
    if ( transition ) {

      // Extracts data
      let computedStyle = window.getComputedStyle( mview );
      let transitionDuration = parseFloat( computedStyle.transitionDuration ) * 1000;

      // Sets timeout
      setTimeout((( ) => {
        this.ongoing = false;
      }).bind(this), transitionDuration);

    }

    // Forces css queue to execute
    this.removePositioningClasses ( );
    mview.classList.add( 'leftview' );
    this.forceQueueExecution( views );

    // Handles throttling when !transition
    if ( !transition ) { this.ongoing = false; }

  }

  // Update view positioning large screen
  updateViewPositioningLargeScreen( store ) {

    // Extracts data
    let state = store.getState(),
      transition = state.views.transition,
      leftview_id  = state.views.leftview,
      rightview_id = state.views.rightview,
      x_leftview_id  = state.views.x_leftview,
      x_rightview_id = state.views.x_rightview,
      from = state.views.from;

    // Mobile last
    if ( this.l_viewrelated != null && this.l_viewrelated.mobile ) {

      // Sets transition
      transition = false;

      // Gets all views and positions them
      let views = document.getElementsByClassName('view');
      for ( let n = 0; n < views.length; n++ ) {
        views[n].style.left = '-50%';
      }

    }


    // Check
    if ( this.lastViews != null &&
      this.lastViews[0] === leftview_id &&
      this.lastViews[1] === rightview_id ) {
      transition = false;
    }

    // Last views
    this.lastViews = [ leftview_id, rightview_id ];

    // Elements
    let leftview = document.getElementById(leftview_id),
      rightview = document.getElementById(rightview_id),
      x_leftview = document.getElementById(x_leftview_id),
      x_rightview = document.getElementById(x_rightview_id);

    // Lists
    let views = [leftview, rightview, x_leftview, x_rightview];

    // Error handling
    if ( leftview == null || rightview == null ||
       ( leftview_id === rightview_id )) {

      // Returns
      return false;

    }

    // If transition is false?, do this:
    if ( !transition ) {

      // Removes transition classes,
      // removes positioning classes and
      // forces css queue execution
      this.rmTransClass(views);
      this.removePositioningClasses();
      this.forceQueueExecution(views);

      // Positions old views
      if ( x_leftview != null ) {
        x_leftview.style.left = '-50%';
      }

      if ( x_rightview != null ) {
        x_rightview.style.left = '-50%';
      }

      // Positions new views
      leftview.style.left = '0%';
      rightview.style.left = '50%';

      // Adds view position classes
      leftview.classList.add('leftview');
      rightview.classList.add('rightview');

      // Returns
      return;

    }

    // Preposition & removes positioning classes
    this.prePosition(...views, from);
    this.removePositioningClasses();

    // Adds | removes transition classes
    this.addTransClass(views);

    // Initial
    if ( x_leftview_id == null || x_rightview_id == null ) {
      leftview.style.left  = '0%';
      rightview.style.left = '50%';
    }

    // From left when some in view
    if ( rightview_id === x_leftview_id  ) {
      leftview.style.left  = '0%';
      rightview.style.left = '50%';

      if ( x_rightview != null ) {
        x_rightview.style.left = '100%';
      }
    }

    // From right when some in view
    if ( leftview_id === x_rightview_id ) {
      leftview.style.left  = '0%';
      rightview.style.left = '50%';

      if ( x_leftview != null ) {
        x_leftview.style.left = '-50%';
      }
    }

    // From left when none is in view
    if ( 'left' === from &&
        ( rightview_id !== x_leftview_id ) &&
        ( leftview_id !== x_rightview_id ) ) {

      if ( x_leftview != null ) {
        x_leftview.style.left = '100%';
      }

      if ( x_rightview != null ) {
        x_rightview.style.left = '150%';
      }

      leftview.style.left  = '0%';
      rightview.style.left = '50%';

    }

    // From right when none is in view
    if ( 'right' === from &&
        ( rightview_id !== x_leftview_id ) &&
        ( leftview_id !== x_rightview_id ) ) {

      if ( x_leftview != null ) {
        x_leftview.style.left = '-50%';
      }

      if ( x_rightview != null ) {
        x_rightview.style.left = '-100%';
      }

      leftview.style.left  = '0%';
      rightview.style.left = '50%';

    }

    // Add positioning classes
    leftview.classList.add( 'leftview' );
    rightview.classList.add( 'rightview' );

    // Returns
    return true;

  }

  // Pre position (All args are the ids)
  prePosition( leftview, rightview, x_leftview, x_rightview, from ) {

    // Views (plural)
    let views = [leftview, rightview];

    // Removes transition classes
    // and forces CSS queue to execute
    this.rmTransClass(views);
    this.forceQueueExecution(views);

    // Left view equals old right
    if ( leftview === x_rightview ) {
      rightview.style.left = '100%';
    }

    // Right view equals old left
    else if ( rightview === x_leftview ) {
      leftview.style.left = '-50%';
    }

    // Else if direction equals left
    else if ( 'left' === from ) {
      leftview.style.left = '-100%';
      rightview.style.left = '-50%';
    }

    // Else if direction equals right
    else if ( 'right' === from ) {
      leftview.style.left = '100%';
      rightview.style.left = '150%';
    }

    // Force queue execution
    this.forceQueueExecution(views);

  }

  // Pre position small screen
  prePositionSmallScreen( mview, x_mview, from ) {

    // Views (plural)
    let views = [ mview ];
    if ( x_mview != null ) { views.push( x_mview ); }

    // Removes transition class
    // And forces css queue to execute
    this.rmTransClass( views );
    this.forceQueueExecution( views );

    // Pre positioning
    if ( x_mview != null ) { x_mview.style.left = '0%'; }
    if ( 'left' === from ) { mview.style.left = '-100%'; }
    if ( 'right' === from ) { mview.style.left = '100%'; }

    // Force queue execution
    this.forceQueueExecution( views );

  }

  // Add trans class
  addTransClass( views ) {

    // Adds the trans class
    // to all elems in array
    for ( let n = 0; n < views.length; n++ ) {
      if ( views[n] != null ) {
        views[n].classList.add( 'trans' );
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
        views[n].offsetHeight;
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
