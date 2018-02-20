

// Imports
import { setMobileMode } from '../actions/ui/mobile.js';

// View Handler
class ViewHandler {

  // Constructor
  constructor ( store ) {

    // Extracts data
    let state = store.getState ( );
    let viewdata = null;
    let ismobile = null;

    // Sets own state
    this.state = {
      viewdata,
      ismobile,
    };

    // Subscribes to store
    store.subscribe ( this.onStoreChange.bind ( this, store ) );

    // Add resize listener n' dispatches it
    window.addEventListener ( 'resize', this.onResize.bind ( this, store ) );
    this.onResize ( store );

  }


  // Updates
  // Std. update (Large devices)
  update ( viewdata ) {

    // Pre positions views n' extracts some dats
    let processeddata = this.preposition ( viewdata );
    let from = processeddata.from;
    let views = processeddata.views;
    let halfed = processeddata.halfed;

    // Adds or removes transition classes, n' forces queue execution
    if ( viewdata.transition ) { this.addTransClasses ( views ); }
    else { this.removeTransClasses ( views ); }
    this.forceQueueExecution ( views );

    // Removes position classes
    this.removePositionClasses ( );

    // Positions views
    // Halfed: Only one view, other than
    // new ones that need positioning
    if ( halfed ) {
      
      if ( 'left' === from && views[3] != null ) { views[3].style.left = '100%'; }
      else if ( 'right' === from && views[2] != null ) { views[2].style.left = '-50%'; }

    }

    // Not halfed: All views needs positionings
    if ( !halfed ) {
      if ( 'left' === from ) {

        if ( views[2] != null ) { views[2].style.left = '100%'; }
        if ( views[3] != null ) { views[3].style.left = '150%'; }

      } else if ( 'right' === from ) {

        if ( views[2] != null ) { views[2].style.left = '-50%'; }
        if ( views[3] != null ) { views[3].style.left = '-100%'; }

      }
    }
    
    // New ones
    if ( views[0] != null ) { views[0].style.left = '0%'; }
    if ( views[1] != null ) { views[1].style.left = '50%'; }

    // Adds position classes
    this.addPositionClasses ( ...(views.slice ( 0, 2 )) );
    this.forceQueueExecution ( views );

  }

  // Update mobile (Small devices)
  updateMobile ( viewdata ) {

    // Prepositions views
    let processeddata = this.prepositionMobile ( viewdata );
    let views = processeddata.views;
    let from = viewdata.from != null ? viewdata.from : 'left';
    let transition = viewdata.transition;

    // Class control (Transition classes)
    if ( transition ) { this.addTransClasses ( views ); }
    else { this.removeTransClasses ( views ); }
    this.forceQueueExecution ( views );

    // Removes position classes
    this.removePositionClasses ( );

    // Positions views
    if ( views[0] != null ) { 
      views[0].style.left = '0%'; 
    }
    
    if ( views[1] != null && views[1] != views[0] ) {
      if ( from === 'left' ) { views[1].style.left = '100%'; }
      if ( from === 'right' ) { views[1].style.left = '-100%'; }
    }

    // Force queue execution n' adds position classes
    this.forceQueueExecution ( views );
    this.addPositionClasses ( ...views );

  }


  // Pre positions
  // Std. preposition (Large devices)
  preposition ( viewdata ) {

    // Extracts data
    // Gets views
    let lv = viewdata.leftview;
    let rv = viewdata.rightview;
    let xlv = null;
    let xrv = null;

    if ( this.state.viewdata != null ) {
      xlv = this.state.viewdata.leftview;
      xrv = this.state.viewdata.rightview;
    }

    // Gets direction
    let from = viewdata.from, halfed = false;
    if ( lv === xrv ) { from = 'right'; halfed = true; }
    if ( rv === xlv ) { from = 'left';  halfed = true; }


    // Converts views from string format
    let views = this.prepareViewList ([ lv, rv, xlv, xrv ]);

    // Class control ( Removes transitions )
    let newviews = [ views[0], views[1] ];
    this.removeTransClasses ( newviews );
    this.forceQueueExecution ( newviews );


    // Does the actual prepositioning
    // Small pre: Only one views needs prepositioning
    if ( halfed ) {
      if ( 'left' === from && views[0] != null ) { 
        views[0].style.left = '-50%'; 
      } else if ( 'right' === from && views[1] != null ) { 
        views[1].style.left = '100%'; 
      }
    }

    // Large pre: Two views needs prepositioning
    if ( !halfed ) {
      if ( 'left' === from ) {

        if ( views[0] != null ) { views[0].style.left = '-100%'; }
        if ( views[1] != null ) { views[1].style.left = '-50%'; }

      } else if ( 'right' === from ) {

        if ( views[0] != null ) { views[0].style.left = '100%'; }
        if ( views[1] != null ) { views[1].style.left = '150%'; }

      }
    }

    // Forces queue execution
    this.forceQueueExecution ( newviews );

    // Returns some data
    return {
      from,
      views,
      halfed
    };

  }

  // Preposition mobile (Small devices)
  prepositionMobile ( viewdata ) {

    // Extracts data
    let mv = viewdata.mview;
    let from = viewdata.from;

    let xmv = null;
    if ( this.state.viewdata != null ) { xmv = this.state.viewdata.mview; }
    let views = this.prepareViewList ([ mv, xmv ]);

    // Remove transition classes
    this.removeTransClasses ( views );
    this.forceQueueExecution ( views );

    // Does the actual prepositioning
    if ( views[0] != null ) {
      if ( 'left' === from ) { views[0].style.left = '-100%'; } 
      else { views[0].style.left = '100%'; }
    }

    // Force queue execution n' returns
    this.forceQueueExecution ( views );
    return { views };

  }


  // Events
  // On Resize (Controls mobile switch)
  onResize ( store ) {

    // Switch to large device mode
    if ( window.innerWidth < 800 && !this.state.ismobile ) {
      store.dispatch ( setMobileMode ( true ) );
    }

    // Switch to small device mode
    if ( window.innerWidth >= 800 && this.state.ismobile ) {
      store.dispatch ( setMobileMode ( false ) );
    }

  }

  // On Store Change
  onStoreChange ( store ) {
    
    // Extracts data
    let state = store.getState ( );
    let viewdata = state.views;
    let ismobile = state.mobile.isMobile;

    // Update?
    if ( !ismobile && (
      this.state.viewdata == null ||
      viewdata.leftview !== this.state.viewdata.leftview ||
      viewdata.rightview !== this.state.viewdata.rightview )) {
      
      this.update ( viewdata );

    }

    // Update mobile?
    if ( ismobile && (
      this.state.viewdata == null || 
      viewdata.mview !== this.state.viewdata.mview )) {
      
      this.updateMobile ( viewdata );

    }

    // Update on resize?
    if ( !ismobile && ismobile !== this.state.ismobile ) {
      this.update ( Object.assign( viewdata, { transition : false }));
    }

    // Update mobile on resize
    if ( ismobile && ismobile !== this.state.ismobile ) {
      this.updateMobile ( Object.assign( viewdata, { transition : false }));
    }

    // Sets state
    this.state = Object.assign({}, this.state, {
      viewdata, ismobile
    });

  }


  // Class Related
  // Add trans classes
  addTransClasses ( views ) {
    if ( views instanceof Array ) {
      views.forEach(( val ) => {
        if ( val != null ) {
          val.classList.add ( 'trans' ); 
        }
      });
    }
  }

  // Remove trans classes
  removeTransClasses ( views ) {
    if ( views instanceof Array ) {
      views.forEach(( val ) => {
        if ( val != null ) {
          val.classList.remove ( 'trans' );
        }
      });
    }
  }

  // Add position classes
  addPositionClasses ( leftview, rightview ) {

    // Left view
    if ( leftview != null ) {
      if ( typeof leftview === 'string' ) {
        leftview = document.getElementById ( leftview );
      } 
      
      if ( leftview != null ) {
        leftview.classList.add ( 'leftview' );
      }
    }

    // Right view
    if ( rightview != null ) {
      if ( typeof rightview === 'string' ) {
        rightview = document.getElementsByClassName ( rightview );
      } 
      
      if ( rightview != null ) {
        rightview.classList.add ( 'rightview' );
      }
    }

  }

  // Remove position classes
  removePositionClasses ( ) {

    // Gets elements
    let leftviews = document.getElementsByClassName ( 'leftview' );
    let rightviews = document.getElementsByClassName ( 'rightview' );

    // Remove classes
    // Left views
    for ( let n = 0; n < leftviews.length; n++ ) {
      leftviews[n].classList.remove ( 'leftview' );
    }

    // Right views
    for ( let n = 0; n < rightviews.length; n++ ) {
      rightviews[n].classList.remove ( 'rightview' );
    }

  }


  // Prepare view list
  prepareViewList ( views ) {
    return views.map(( val ) => {
      if ( typeof val === 'string' && val != null ) {
        val = document.getElementById ( val );
      } return val;
    });
  }


  // Force css queue execution
  forceQueueExecution ( elements ) {
    if ( elements instanceof Array ) {
      elements.forEach (( val ) => {
        if ( val != null ) {
          val.clientHeight;
        }
      });
    }
  }

}

// Exports
export default ViewHandler;