

// Imports
import React from 'react';
import View from '../view.js';
import Advertisements from '../parts/advertisements.js';

// Tools
import { nl2p } from '../../tools/formatters.js';

// Welcome View component
class WelcomeView extends View {

  // Render
  render() {
    return (
      <View id="welcome-view" title="Velkommen til Towwwn"
      icon="#towwwn-logo-17" viewBox="0 0 32 32"
      store={ this.props.store }>

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
            Start med at vælge enten begivenheder<br/>eller steder i menuen til venstre.
          </div>

          {/* Advertisements */}
          <Advertisements store={this.props.store} />

        </div>

      </View>
    );
  }

}

// Exports
export default WelcomeView;
