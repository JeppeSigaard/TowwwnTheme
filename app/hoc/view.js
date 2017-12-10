

// Imports
import React from 'react';

// View HOC
const View = (( WrappedComponent ) => ( id, title ) =>
  class extends React.Component {

    // Constructor
    constructor( props ) {
      super( props );
    }

    // Render
    render() {
      return (
        <div className="view" id={ id } >
          <div className="view-inner">

            {/* Head */}
            <header className="view-head">
              <div className="title">{ title }</div>
            </header>

            {/* Body */}
            <div className="view-body">
              <WrappedComponent {...this.props} />
            </div>

          </div>
        </div>
      );
    }

});

// Exports
export default View;
