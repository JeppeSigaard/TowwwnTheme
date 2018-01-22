

// Imports
import React from 'react';
import CTAIcons from './parts/ctaicons.js';

// Commercial component
class Advertisement extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      ctaelems : [ ],
    };
  }

  // Render
  render() {
    return this.props.element != null ? (

      <div className={"advertisement "+(this.props.inline?'inline':'')}
        style={{ backgroundImage : 'url('+this.props.element.img+')' }}
        target="_blank" >

        {/* Cta Icons */}
        <CTAIcons elements={this.state.ctaelems} />

      </div>

    ) : (

      <div className={"advertisement "+(this.props.inline?'inline':'')}>
      </div>

    );
  }

  // Update state
  updateState( props ) {

      // Error handling
      if(props==null||props.element==null){return;}

      // Creates response field
      let ctaelems = [ ];
      let buttons = props.element.buttons;

      // Loops through buttons and pushes cat elems
      if ( buttons != null ) {
        for ( let n = 0; n < buttons.length; n++ ) {

          // Extracts data
          let href = buttons[n].button_url;
          let type = buttons[n].button_icon[0];
          let text = buttons[n].button_text;

          let viewBox = (type === 'ig') ? '0 0 20 20' : '0 0 32 32';
          let xlinkHref = (type === 'fb' ? '#icon-facebook' :
            ( type === 'ig' ? '#icon-instagram' : '#icon-web' ));

          // Pushes cta elem
          ctaelems.push({
            href, viewBox,
            xlinkHref, text
          });

        }
      }

      // Sets state
      this.setState({ ctaelems });

  }

  // Component will mount
  componentDidMount() { this.updateState( this.props ); }
  componentWillReceiveProps(props) { this.updateState( props ); }

}

// Exports
export default Advertisement;
