

// Imports
import React from 'react';
import View from '../view.js';

import Railbar from '../../presentationals/railbar.js';
import Fader from '../../presentationals/fader.js';
import Advertisements from '../parts/advertisements.js';

// Tools
import { nl2p } from '../../tools/formatters.js';

// Welcome View component
class WelcomeView extends View {

  // Constructor
  constructor() {
    super();
    this.state = {
      faderIndex : 0,
      posts : typeof app_data.text_sections === 'object' ?
        app_data.text_sections : [ ],
    };
  }

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

                  <div className="fb-text">facebook</div>
                </div>

              </a>

              <div className="icon"
                style={{ backgroundImage : 'url('+app_data.logo+')' }} >
              </div>

              <div className="title">Velkommen til Towwwn</div>
              <div className="subtitle">www.towwwn.dk</div>

            </div>

          </div>

          {/* Text railbar */}
          <Railbar identificationKey="welcome-view-railbar" elements={
            this.state.posts.map(this.renderRailbarPost.bind(this))
          } colorScheme="accent" />

          {/* Fader */}
          <div className="text">
            <Fader index={ this.state.faderIndex } elements={
              this.state.posts.map(this.renderFaderPost.bind(this))
            } />
          </div>

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

  // Render railbar post
  renderRailbarPost( val ) {

    // Extracts data
    let index = this.state.posts.indexOf(val);
    let title = val.title;

    // Set index function
    let setIndex = (( ) => {
      this.setState({ faderIndex : index });
    }).bind(this);

    // Returns
    return (
      <div className="text-section-btn"
        key={ 'textsection-head#'+index }
        onClick={ setIndex } >

        { title }

      </div>
    );

  }

  // Render fader post
  renderFaderPost( val ) {

    // Extracts data
    let index = this.state.posts.indexOf(val);
    let text  = val.text;

    // Returns
    return (
      <div className="text-section" key={ 'textsection-body#'+index }>
        { nl2p(text) }
      </div>
    );

  }

}

// Exports
export default WelcomeView;
