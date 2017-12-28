

// Imports
import React from 'react';
import HookController from '../tools/hookcontroller.js';

// Actions
import { setViewFocus } from '../actions/ui.js';

// View HOC
class View extends React.Component {

    // Constructor
    constructor( props ) {
      super( props );
      this.hooks = new HookController();
    }

    // Render
    generateRender(children) {
      return (
        <div className="view" id={this.state.id}
          onScroll={ this.processScroll.bind(this) } >

          <div className="view-inner">

            {/* Head */}
            <header className="view-head">

              { this.state.icon != null &&
                <svg className="icon" viewBox={this.state.viewBox}>
                  <use xlinkHref={this.state.icon}></use>
                </svg>
              }

              <div className="title">
                { this.state.title != null &&
                  this.state.title }
              </div>

              { this.state.closeProps != null &&
                <div className="close"
                  onClick={ this.processClose.bind(this) } >

                  <svg viewBox="0 0 20 20">
                    <use xlinkHref="#icon-close">
                    </use>
                  </svg>

                </div>
              }

            </header>

            {/* Body */}
            <div className="view-body">
              { children != null && children }
            </div>

          </div>

        </div>
      );
    }

    // On Scroll
    processScroll() {

      // Extracts for view & inner view
      let view = document.getElementById(this.state.id);
      let innerview = document.querySelectorAll
        ('#'+this.state.id+' .view-inner')[0];

      // Gets internal scroll top value
      let scrollY = document.getElementById
        (this.state.id).scrollTop;

      // Error handling
      if (innerview == null){
        throw "Inner view wasn't found for view: "+this.state.id;
        return false;
      }

      // Composes event payload
      let payload = {
        viewCSSProps : window.getComputedStyle(view),
        innerViewCSSProps : window.getComputedStyle(innerview),
        scrollY,
      };

      // Triggers event
      this.hooks.trigger('scroll',payload);

    }

    // Process Close
    processClose() {
      if ( this.state.closeProps != null &&
           this.props.store != null ) {

        // Dispatches view change action
        this.props.store.dispatch(setViewFocus
          (...this.state.closeProps));

      }
    }

}

// Exports
export default View;
