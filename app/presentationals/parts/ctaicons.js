

// Imports
import React from 'react';

// Call to action icons component
class CTAIcons extends React.Component {

  // Render
  render() {
    return (
      <div className="cta-icons">

        { this.props.elements != null &&
          this.props.elements.map(this.renderMap.bind(this)) }

      </div>
    );
  }

  // Render map
  renderMap( val ) {

    // Nooop?
    const noop = (( e ) => { });

    // Returns
    return (
      <a className="cta-icon" target="_blank" key={val['text']+'#'+val['href']}
        href={ val['href'] != null ? val['href'] : '#' }
        onClick={ val['onClick'] != null ? val['onClick'] : noop } >

        <div className="cta-icon-inner">
          <svg viewBox={ val['viewBox'] != null ? val['viewBox'] : '0 0 32 32' }>
            <use xlinkHref={ val['xlinkHref'] != null ? val['xlinkHref'] : '' } >
            </use>
          </svg>

          <div className="text">
            { val['text'] != null ? val['text'] : '' }
          </div>
        </div>

      </a>
    );

  }

}

// Exports
export default CTAIcons;
