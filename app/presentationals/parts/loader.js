

// Imports
import React from 'react';

// Loader component
class Loader extends React.Component {

  // Render
  render() {
    return (
      <div className={"loader-outer"+(this.props.relative?' relative':'')}>
        <div className="loader-inner">
          <div className="loader-line loader-line-1"></div>
          <div className="loader-line loader-line-2"></div>
          <div className="loader-line loader-line-3"></div>
        </div>
      </div>
    );
  }

}

// Exports
export default Loader;
