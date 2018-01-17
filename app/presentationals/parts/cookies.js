

// Imports
import React from 'react';
import { cookies } from '../../tools/cookies.js';

// Cookies component
class Cookies extends React.Component {

  // Render
  render() {
    return (
      <div className="cookies">

        {/* Text */}
        <div className="text">

          <svg viewBox="0 0 32 32">
            <use xlinkHref="#towwwn-logo-17">
            </use>
          </svg>

          <div className="title">
            Towwwn bruger cookies,
          </div>

          <div className="sub-title">
            For at forbedre din oplevelse
          </div>

        </div>

        {/* Buttons */}
        <div className="buttons">

          <a className="button" href="#"
            onClick={ this.onClick.bind(this, 'okay') } >
            Okay
          </a>

          <a className="button" href="https://towwwn.dk/cookie-og-privatlivspolitik"
            onClick={ this.onClick.bind(this, 'read-more') } >
            Læs mere
          </a>

        </div>

      </div>
    );
  }

  // On click
  onClick( type, e ) {

    // If the okay button was clicked
    if ( 'okay' === type ) {

      // Prevent redirection
      e.preventDefault();

      // Set cookie
      cookies.setItem( 'cookies_accepted', true, Infinity, '/' );

      // On click
      if ( this.props.onClick != null ) {
        this.props.onClick( e, type );
      }
    }

  }

}

// Exports
export default Cookies;
