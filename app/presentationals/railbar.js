

// Imports
import React from 'react';

// Rail bar component
class Railbar extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {

      items  : [ ],
      index  : 0,
      offset : 0,

      cursor_pressed        : false,
      cursor_pressed_time   : null,
      cursor_pressed_offset : 0,
      cursor_pressed_pos    : { x : null, y : null },

    };
  }

  // Render
  render() {
    return (
      <div className={"railbar colorscheme-"+( this.props.colorScheme )}
        ref="railbar" >

        <div className="railbar-inner" ref="railbar-inner"
          style={{ 'left': - this.state.offset + 'px' }} >

          { this.state.items.map(this.renderElement.bind(this)) }

        </div>

      </div>
    );
  }

  // Render Element
  renderElement( val ) {

    // Extracts data
    let index  = this.state.items.indexOf(val);
    let active = index === this.state.index;

    // Returns
    return (
      <div className={ "railbar-item" + ( active ? " active" : "" ) }
        onMouseUp={ this.processItemCursorReleased.bind(this, index) }
        onTouchEnd={ this.processItemCursorReleased.bind(this, index) }
        key={ 'railbar-item#'+index }
        ref={ 'railbar-item#'+index }>

        { val }

      </div>
    );

  }

  // Set index
  setIndex( index ) {

    // Extracts data
    let keysLen = this.state.items.length;

    // Error handling
    if ( index < 0 ) { index = 0; }
    if ( index >= keysLen ) { index = keysLen - 1; }

    // Sets state
    this.setState({ index });

  }

  // Process cursor pressed
  processCursorPressed( e ) {
    e.preventDefault();

    // Removes transition from railbar inner
    this.removeTransition();

    // Gets the global position of mouse
    let cursor_pressed_pos  = {
      x : e.touches != null ? e.touches[0].screenX : e.screenX,
      y : e.touches != null ? e.touches[0].screenY : e.screenY
    };

    // Sets current time
    let cursor_pressed_time = (new Date()).getTime();

    // Enables prevent user select
    let dom_elements = document.getElementsByTagName('body');
    for ( let n = 0; n < dom_elements.length; n++ ) {
      dom_elements[n].classList.add('preventUserSelect');
    }

    // Sets state
    this.setState({
      cursor_pressed_offset : this.state.offset,
      cursor_pressed : true,
      cursor_pressed_pos,
      cursor_pressed_time
    });

  }

  // Process cursor released
  processCursorReleased( e ) {

    // Disables prevent user select
    let dom_elements = document.getElementsByClassName('preventUserSelect');
    for ( let n = 0; n < dom_elements.length; n++ ) {
      dom_elements[n].classList.remove('preventUserSelect');
    }

    // Sets offset if out of bounds
    let offset      = this.state.offset;
    let inner_left  = -(offset);
    let inner_right = inner_left + this.refs['railbar-inner'].clientWidth;
    let outer_width = this.refs['railbar'].clientWidth;
    let inner_width = this.refs['railbar-inner'].clientWidth;

    // Sets offset
    this.addTransition();
    if ( inner_width > outer_width ) {
      if ( inner_left > 0 ) { offset = 0; }
      if ( inner_right < outer_width ) { offset = -(outer_width - inner_width); }
    } else { offset = 0; }

    // Sets state
    this.setState({

      cursor_pressed : false,
      offset,

    });

  }

  // Process item cursor release
  processItemCursorReleased( val, e ) {
    // Extracts data
    let now = (new Date()).getTime();
    let bef = this.state.cursor_pressed_time;
    let tim = 200;

    // Sets index if clicked not pressed
    if ( now - bef <= tim ) {
      this.setIndex( parseInt(val) );

      // Triggers child elements click event
      let childs = this.refs['railbar-item#'+val].children;
      for ( let n = 0; n < childs.length; n++ ) {
        if ( childs[n].click != null ) {
          childs[n].click();
        }
      }

    }

  }

  // Process cursor move
  processCursorMove( e ) {

    // If pressed
    if ( this.state.cursor_pressed ) {

      // Extracts data
      let screenX    = ( e.touches != null ) ? e.touches[0].screenX : e.screenX;
      let difference = this.state.cursor_pressed_pos.x - screenX;
      let oldOffset  = this.state.cursor_pressed_offset;
      let newOffset  = oldOffset + difference;

      // Extracts data used in the interpolation process
      let inner_left  = -(newOffset);
      let inner_right = -(newOffset) + this.refs['railbar-inner'].clientWidth;
      let outer_width = this.refs['railbar'].clientWidth;
      let inner_width = this.refs['railbar-inner'].clientWidth;

      // Interpolates out of bounds
      if ( (inner_left > 0 || inner_right < outer_width) && inner_width > outer_width ) {

        // Gets the amount that the inner elem is out of bound
        let outOfBoundsAmount = ( inner_left > 0 ) ?
          inner_left : outer_width - inner_right;

        // Dampens newOffset
        newOffset = ( inner_left > 0 ) ?
          (newOffset + (outOfBoundsAmount / 6) * 5) :
          (newOffset - (outOfBoundsAmount / 6) * 5);

      } else if ( inner_width <= outer_width ) {

        // Gets the amount that the inner elem is out of bound
        let outOfBoundsAmount = Math.abs( inner_left );

        // Dampens newOffset
        newOffset = ( inner_left > 0 ) ?
          -(outOfBoundsAmount / 6) : (outOfBoundsAmount / 6);

      }

      // Sets state
      this.setState({
        offset : newOffset
      });

    }

  }

  // Add trans
  addTransition() {

    // Extracts data
    let inner = this.refs['railbar-inner'];

    // Adds class n' forces CSS queue to execute
    inner.classList.remove( 'notrans' );
    inner.offsetHeight;

  }

  // Remove trans
  removeTransition() {

    // Extracts data
    let inner = this.refs['railbar-inner'];

    // Adds class n' forces CSS queue to execute
    inner.classList.add( 'notrans' );
    inner.offsetHeight;

  }

  // Component did mount
  componentDidMount() {

    // Extracts dats
    let railbar = this.refs['railbar'];

    // Add event listeners
    // Cursor pressed (down)
    railbar.addEventListener( 'touchstart', this.processCursorPressed.bind(this) );
    railbar.addEventListener( 'mousedown', this.processCursorPressed.bind(this) );

    // Cursor released (up)
    document.addEventListener( 'touchend', this.processCursorReleased.bind(this) );
    document.addEventListener( 'mouseup', this.processCursorReleased.bind(this) );
    window.addEventListener( 'resize', this.processCursorReleased.bind(this) );

    // Cursor moved
    document.addEventListener( 'touchmove', this.processCursorMove.bind(this) );
    document.addEventListener( 'mousemove', this.processCursorMove.bind(this) );

  }

  // Component will unmount
  componentWillUnmount() {

    // Extracts data
    let railbar = this.refs['railbar'];

    // Removes event listeners
    // Cursor pressed (down)
    railbar.removeEventListener( 'touchstart', this.processCursorPressed.bind(this) );
    railbar.removeEventListener( 'mousedown', this.processCursorPressed.bind(this) );

    // Cursor released (up)
    document.removeEventListener( 'touchend', this.processCursorReleased.bind(this) );
    document.removeEventListener( 'mouseup', this.processCursorReleased.bind(this) );
    window.removeEventListener( 'resize', this.processCursorReleased.bind(this) );

    // Cursor moved
    document.removeEventListener( 'touchmove', this.processCursorMove.bind(this) );
    document.removeEventListener( 'mousemove', this.processCursorMove.bind(this) );

  }

  // Component will receive props
  componentWillReceiveProps( nextProps ) {

    // Extracts data
    let offset = this.state.offset;
    let items  = [ ];

    // If children is an array
    if ( nextProps.elements != null  ) {
      if ( nextProps.elements.constructor.name === 'Array' ) {
        items = nextProps.elements;
      }
    }

    // Checks if key has changes
    let reset = false;
    if ( nextProps.identificationKey !== this.identificationKey ) {
      this.identificationKey = nextProps.identificationKey;
      offset = 0; reset = true;
    }

    // Sets states
    this.setState({
      items,
      offset,
    }, () => {
      if ( reset ) {
        this.setIndex(0);
      }
    });

  }

}

// Exports
export default Railbar;
