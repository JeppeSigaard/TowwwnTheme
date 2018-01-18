

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

          <Railbar identificationKey="welcome-view-railbar" elements={[

            <div className="text-section-btn" onClick={(() => { this.setState({ index : 0 }) }).bind(this)}>
              Hi
            </div>,

            <div className="text-section-btn" onClick={(() => { this.setState({ index : 1 }) }).bind(this)}>
              Hey
            </div>,

            <div className="text-section-btn" onClick={(() => { this.setState({ index : 2 }) }).bind(this)}>
              Ho
            </div>

          ]} colorScheme="accent" />

          {/* Desc */}
          { app_data.desc != null &&
            <div className="desc">
              <Fader index={ this.state.index } elements={[

                <p>I modsætning til hvad mange tror, er Lorem Ipsum ikke bare tilfældig tekst. Det stammer fra et stykke litteratur på latin fra år 45 f.kr., hvilket gør teksten over 2000 år gammel. Richard McClintock, professor i latin fra Hampden-Sydney universitet i Virginia, undersøgte et af de mindst kendte ord "consectetur" fra en del af Lorem Ipsum, og fandt frem til dets oprindelse ved at studere brugen gennem klassisk litteratur. Lorem Ipsum stammer fra afsnittene 1.10.32 og 1.10.33 fra "de Finibus Bonorum et Malorum" (Det gode og ondes ekstremer), som er skrevet af Cicero i år 45 f.kr. Bogen, som var meget populær i renæssancen, er en afhandling om etik. Den første linie af Lorem Ipsum "Lorem ipsum dolor sit amet..." kommer fra en linje i afsnit 1.10.32.</p>,

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere lobortis commodo. Phasellus rhoncus cursus libero, eget sagittis odio ultricies ut. Cras eget ante et odio accumsan luctus. Donec feugiat mauris nibh, ac iaculis nibh gravida ac. Nulla quis aliquet turpis. Aliquam non ullamcorper libero. Vivamus eget rhoncus quam. Nulla odio massa, facilisis nec imperdiet et, pretium non tortor. Nunc sagittis sem in ante fermentum, ac sodales metus rhoncus. Maecenas venenatis nunc sit amet tortor tempor sodales. Donec porttitor consectetur sollicitudin. Sed nibh quam, commodo id varius et, tincidunt at elit.

  Nam non nulla placerat, aliquet urna nec, laoreet augue. Nullam viverra, tortor at dictum semper, dolor felis eleifend est, vitae auctor tellus massa vitae justo. Vestibulum luctus bibendum diam, quis malesuada orci luctus vel. Donec convallis libero quis sapien lacinia, sit amet aliquet lacus elementum. Phasellus eleifend dictum iaculis. Ut vulputate tortor sed felis pellentesque commodo fermentum vel leo. Fusce nibh purus, ullamcorper nec ante ac, posuere aliquam enim.</p>,

                <p>En søgning på Lorem Ipsum afslører mange websider, som stadig er på udviklingsstadiet. Der har været et utal af variationer, som er opstået enten på grund af fejl og andre gange med vilje (som blandt andet et resultat af humor). En søgning på Lorem Ipsum afslører mange websider, som stadig er på udviklingsstadiet. Der har været et utal af variationer, som er opstået enten på grund af fejl og andre gange med vilje (som blandt andet et resultat af humor).En søgning på Lorem Ipsum afslører mange websider, som stadig er på udviklingsstadiet. Der har været et utal af variationer, som er opstået enten på grund af fejl og andre gange med vilje (som blandt andet et resultat af humor).</p>

              ]} />
            </div>
          }

          {/* Start off */}
          <div className="startoff">
            Start med at vælge enten begivenheder<br/>eller steder i menuen til venstre.
          </div>

          {/* Advertisements */}
          {/*<Advertisements store={this.props.store} />*/}

        </div>

      </View>
    );
  }

}

// Exports
export default WelcomeView;
