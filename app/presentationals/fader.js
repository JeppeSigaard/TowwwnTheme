

// Imports
import React from 'react';

// Slider Component
class Fader extends React.Component {

  // Constructor
  constructor( ) {
    super();
    this.state = {
      items : [ ],
      index : 0,
      innerHeight : 'auto',
    };
  }

  // Render
  render() {
    return (
      <div className="fader" ref="slider" >
        <div className="fader-inner" style={{ height: this.state.innerHeight }}>
          { this.state.items.map(this.renderComponent.bind(this)) }
        </div>
      </div>
    );
  }

  // Render component
  renderComponent(val) {

    // Extracts data
    let index  = this.state.items.indexOf(val);
    let active = index === this.state.index ? true : false;

    // Returns
    return (
      <div className={ 'fader-item'+(active?' active':'')}
        ref={ 'fader-item#'+index }
        key={ 'fader-item#'+index } >
        { val }
      </div>
    );

  }

  // Set index
  setIndex( index ) {

    // Makes sure index is within bounds
    index = index % this.state.items.length;

    // Checks that the item has been mounted
    if ( this.refs['fader-item#'+index] != null ) {

      // Extracts data
      let faderItem = this.refs['fader-item#'+index];
      let innerHeight = faderItem.clientHeight+'px';

      // Sets state
      this.setState({
        index, innerHeight
      });

    }

  }

  // Force update
  forceUpdate( props, cb ) {
    if ( props.elements != null && props.index != null ) {

      this.setState({ items : props.elements, index : props.index }, () => {
        this.setIndex(this.state.index);
        if ( cb != null ) { cb(); }
      });

    }
  }

  // Component will receive props
  componentWillReceiveProps( nextProps ) {
    this.forceUpdate( nextProps );
  }

  // Component will mount
  componentWillMount() {
    this.forceUpdate( this.props, () => {
      window.addEventListener( 'resize', (() => {
        this.setIndex( this.state.index );
      }).bind(this));
    });
  }

}

// Exports
export default Fader;
