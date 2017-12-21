

// Imports
import React from 'react';
import View from '../../hoc/view.js';
import { nl2p } from '../../tools/formatters.js';

// Welcome View component
class WelcomeView extends View {

  // Constructor
  constructor( props ) {
    super(props);
    this.state = {
      id : 'welcome-view',
      title : 'Velkommen til Towwwn',
      icon : '#towwwn-logo-17',
      viewBox : '0 0 32 32'
    };
  }

  // Render
  render() {
    return this.generateRender(
      <div className="welcome-message">

        {/* Head */}
        <div className="head">

          <div className="coverimage"
            style={{ backgroundImage : 'url('+app_data.coverimage+')' }} >

            <a className="fb" target="_blank"
              href={ 'http://fb.com/'+app_data.fbid } >

              <div className="fb-icon">
                <svg viewBox="0 0 32 33">
                  <use xlinkHref="#icon-facebook">
                  </use>
                </svg>

                <div className="text">facebook</div>
              </div>

            </a>

            <div className="icon"
              style={{ backgroundImage : 'url('+app_data.logo+')' }} >
            </div>

            <div className="title">Velkommen til Towwwn</div>
            <div className="subtitle">www.towwwn.dk</div>

          </div>

        </div>

        {/* Desc */}
        { app_data.desc != null &&
          <div className="desc">
            { nl2p(app_data.desc) }
          </div>
        }

        {/* Start off */}
        <div className="startoff">
          Start med at vælge en begivenhed til højre
        </div>

      </div>
    );
  }

}

// Exports
export default WelcomeView;
