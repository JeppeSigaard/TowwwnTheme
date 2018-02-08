

// Imports
import React from 'react';

// Components
import View from '../view.js';
import SingleFooter from '../parts/singlefooter.js';

import Linkify from 'react-linkify';

// Tools
import { nl2p, renderDynamicOpenTimes } from '../../tools/formatters.js';

// Single place view component
class SinglePlaceView extends View {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      element : null,
      id : 'single-place-view',
      title : 'Sted',
    };
  }

  // Render
  render() {
    return (
      <View id={this.state.id} title={this.state.title}
      icon="#icon-location" viewBox="0 0 32 32" onClose={ this.onClose.bind(this) }
      closeProps={[ 'category-view','place-list-view','place-list-view', 'left', true ]}
      store={ this.props.store }>

        <div className="singleplace" key={'single-place-view'} >
          { this.state.element != null && <div className="singleplace-inner">

            {/* Header */}
            <header className="singleplace-header">
              <div className="coverimage" style={{
                backgroundImage : 'url('+this.state.element['coverphoto']+')' }} >

                <div className="logo" style={{
                  backgroundImage : 'url('+this.state.element['picture']+')' }} >
                </div>

                <div className="text">
                  <div className="title">{ this.state.element['name'] }</div>
                  <div className="open">
                    { renderDynamicOpenTimes(this.state.element['hours']) }
                  </div>
                </div>

              </div>
            </header>

            {/* Call to action icons */}
            <div className="singleplace-cta">
              <div className="leftside singleplace-cta-row">

                {/* Call button */}
                { this.state.element['phone'] != null &&
                  <a className="cta-btn"
                    href={'tel://'+this.state.element['phone']}>

                    <svg viewBox="0 0 32 32">
                      <use xlinkHref="#icon-phone">
                      </use>
                    </svg>

                  </a>
                }

                {/* Go to website button */}
                { this.state.element['website'] != null &&
                  <a className="cta-btn" target="_blank"
                    href={ this.state.element['website'] } >

                    <svg viewBox="0 0 32 32">
                      <use xlinkHref="#icon-web">
                      </use>
                    </svg>

                  </a>
                }

                {/* View adress button */}
                { this.state.element['adress'] != null &&
                  <a className="cta-btn" target="_blank"
                    href={'https://www.google.dk/maps/place/'+
                    this.state.element['adress']}>

                    <svg viewBox="0 0 32 32">
                      <use xlinkHref="#icon-location">
                      </use>
                    </svg>

                  </a>
                }

                {/* Facebook button */}
                <a className="cta-btn" target="_blank"
                  href={'https://fb.com/'+this.state.element['fbid']}>

                  <svg viewBox="0 0 32 32">
                    <use xlinkHref="#icon-facebook">
                    </use>
                  </svg>

                </a>

              </div>

              <div className="rightside singleplace-cta-row">

                {/* Share button */}
                <a className="cta-btn"target="_blank"
                  href={'https://fb.com/'+this.state.element['fbid']}
                  onClick={this.share.bind(this)}>

                  <svg viewBox="0 0 32 32">
                    <use xlinkHref="#icon-share">
                    </use>
                  </svg>

                </a>

              </div>
            </div>

            {/* Body */}
            { this.state.element['description'] != null &&

              <div className="singleplace-body">
                <Linkify>
                  { nl2p(this.state.element['description']) }
                </Linkify>
              </div>

            }

            { this.state.element['description'] == null &&
              this.state.element['about'] != null &&

              <div className="singleplace-body">
                <Linkify>
                  { nl2p(this.state.element['about']) }
                </Linkify>
              </div>

            }

            { this.state.element['description'] == null &&
              this.state.element['about'] == null &&

              <div className="singleplace-body">
                <p>Dette sted har ingen beskrivelse.</p>
              </div>

            }

            {/* Footer */}
            <SingleFooter element={ this.state.element } elementType="place"
              store={ this.props.store } />

          </div> }
        </div>

      </View>
    );
  }

  // Share
  share(e) {

    // Prevents redirect
    e.preventDefault();

    // Share dialog
    FB.ui({
      method: 'share',
      href: ('https://facebook.com/'+this.state.element['fbid']),
    }, ((response) => {}));

  }

  // Reset scroll
  resetScroll( withTrans ) {

    // Gets view, its transition time and scroll down.
    let scroller = document.querySelectorAll( '#'+this.state.id+' .scroller' )[0];
    let trans = parseFloat(window.getComputedStyle(scroller).transitionDuration) * 1000;
    setTimeout(() => { scroller.scrollTo( 0, 0 ); }, withTrans?trans:0 );

  }

  // On close
  onClose() {
    this.resetScroll( true );
   }

  // On store change
  onStoreChange() {

    // Sets title
    // Extracts data
    let state = this.props.store.getState();
    let shown_place = state.ui.shown_single_place;
    let element = state.places.elements[String(shown_place)];

    // Resets scroll
    if ( element !== this.state.element ) {
      this.resetScroll( false );
    }

    // Error handling
    if ( element == null ) { return; }

    // Response
    let response = { };
    response['title'] = element.name;
    response['element'] = element;

    // Sets state
    this.setState(response);

  }

  // Component did mount
  componentDidMount() {
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }
  }

}

// Exports
export default SinglePlaceView;
