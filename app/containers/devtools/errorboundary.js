

// Imports
import React from 'react';

// Error Boundary component
class ErrorBoundary extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      error : null,
      errorInfo : null,
    };
  }

  // Render
  render() {

    // Error
    if ( this.state.error ) {
      return (
        <div className="error">
          <div className="error-inner">

            <div className="logo">
              <svg viewBox="0 0 32 32">
                <use xlinkHref="#towwwn-logo-17">
                </use>
              </svg>
            </div>

            <div className="error-title">
              Whoops, an error occured.
            </div>

            <div className="error-type">
              <div className="title">{ "Error message:" }</div>
              <div className="info">
              { this.state.error.message != null &&
                this.state.error.message }
              </div>
            </div>

            <div className="componentstack">
              <div className="title">{ "Component stack:" }</div>
              <div className="info">
                { this.state.errorInfo.componentStack != null &&
                  this.state.errorInfo.componentStack }
              </div>
            </div>

          </div>
        </div>
      );
    }

    // No error
    return this.props.children;

  }

  // Component did catch
  componentDidCatch( error, errorInfo ) {
    this.setState({ error, errorInfo });
  }

}

// Exports
export default ErrorBoundary;
