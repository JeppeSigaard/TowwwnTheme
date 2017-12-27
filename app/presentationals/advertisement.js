

// Imports
import React from 'react';
import CTAIcons from './parts/ctaicons.js';

// Commercial component
class Advertisement extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      ctaelems : [

      ],
    };
  }

  // Render
  render() {
    return (
      <a className="commercial" target="_blank"
        href={ this.props.element.link }
        style={{ backgroundImage : 'url('+this.props.element.img+')' }}>

        {/* Cta Icons */}
        <CTAIcons elements={this.state.ctaelems} />

      </a>
    );
  }

  // Update state
  updateState( props ) {

      // Creates response field
      let ctaelems = [ ];

      // Sets facebook link
      if ( props.element.fburl != null ) {
        ctaelems.push({
          href : props.element.fburl,
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-facebook',
          text : 'facebook'
        });
      }

      // Sets instagram link
      if ( props.element.insta != null ) {
        ctaelems.push({
          href : props.element.insta,
          viewBox : '0 0 20 20',
          xlinkHref : '#icon-insta',
          text : 'instagram',
        });
      }

      // Sets website link
      if ( props.element.link != null ) {
        ctaelems.push({
          href : this.props.element.link,
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-web',
          text : 'website',
        });
      }

      // Sets state
      this.setState({ ctaelems });

  }

  // Component will mount
  componentWillMount(props) { this.updateState( props ); }
  componentWillReceiveProps(props) { this.updateState( props ); }

}

// Exports
export default Advertisement;
