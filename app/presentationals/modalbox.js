

// Imports
import React from 'react';

// Modal box component
class ModalBox extends React.Component {

  // Render
  render() {
    return (
      <div className="modal-box">

        {/* Overlay */}
        <div className="overlay">
        </div>

        {/* Inner */}
        <div className="modal-box-inner">

          {/* Header */}
          { this.props.headless !== true &&
            <header className="modal-box-head">

              <div className="title">
                { this.props.title != null && this.props.title }
              </div>

              { this.props.closeable !== false &&
                <div className="close" onClick={ this.props.close } >
                </div>
              }

            </header>
          }

          {/* Body */}
          <div className={"modal-box-body "+(this.props.borderless?'borderless':'')}>
            { this.props.children != null && this.props.children }
          </div>

        </div>

      </div>
    );
  }

}

// Exports
export default ModalBox;
