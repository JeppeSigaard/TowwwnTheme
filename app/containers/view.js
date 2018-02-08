

// Imports
import React from 'react';
import HookController from '../tools/hookcontroller.js';

// Actions
import { setViewFocus } from '../actions/ui.js';

// View HOC
class View extends React.Component {

  // Render
  render() {
    return (
      <div className="view" id={this.props.id} ref="outer" >

        {/* Head */}
        <header className="view-head" ref="header">

          { this.props.icon != null &&
            <svg className="icon" viewBox={this.props.viewBox}>
              <use xlinkHref={this.props.icon}></use>
            </svg>
          }

          <div className={"title"+(
            this.props.closeProps!=null?' canClose':'')} >

            { this.props.title != null &&
              this.props.title }

          </div>

          { this.props.closeProps != null &&
            <div className="close" onClick={ this.processClose.bind(this) } >
            </div>
          }

        </header>
        
        <div className="scroller" ref="scroller" onScroll={ this.processScroll.bind(this) }>
          <div className={ "view-inner" + ( this.props.topbar != null ?
            ' has-topbar' : '' ) }>

            {/* Top bar */}
            { this.props.topbar != null &&
              <div className="topbar">
                { this.props.topbar }
              </div>
            }

            {/* Body */}
            <div className="view-body">
              { this.props.children != null && this.props.children }
            </div>

          </div>
        </div>

      </div>
    );
  }

  // On Scroll
  processScroll() {

    // Error handling
    if ( this.refs.outer == null ) { return; }

    // Extracts for view & inner view
    let view = this.refs.outer
    let scroller = this.refs.scroller;
    let viewhead = this.refs.header;
    let scrollY = scroller.scrollTop;

    // Error handling
    if ( scroller == null ) {
      throw "Inner view wasn't found for view: "+this.props.id;
      return false;
    }

    // Composes event payload
    let payload = {
      viewCSSProps : window.getComputedStyle( view ),
      scrollerCSSProps : window.getComputedStyle( scroller ),
      scrollY,
    };

    // Calls on scroll function
    if ( this.props.onScroll != null ) {
      this.props.onScroll(payload);
    }

  }

  // Process Close
  processClose() {
    if ( this.props.closeProps != null &&
          this.props.store != null ) {

      // Call child close function
      if ( this.props.onClose != null ) {
        this.props.onClose(); }


      // Dispatches view change action
      this.props.store.dispatch(setViewFocus
        (...this.props.closeProps));

    }
  }

}

// Exports
export default View;
