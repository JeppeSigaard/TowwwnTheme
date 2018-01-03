

// Imports
import React from 'react';
import CTAIcons from './parts/ctaicons.js';

// Commercial component
class Advertisement extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      ctaelems : [],
    };
  }

  // Render
  render() {
    return this.props.element != null ? (

      <div className={"advertisement "+(this.props.inline?'inline':'')}
        style={{ backgroundImage : 'url('+this.props.element.img+')' }}
        target="_blank" >

        {/* Title */}
        { this.props.element.title != null &&
          <div className="title">
            { this.props.element.title }
          </div>
        }

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

      // Sets facebook link
      if ( props.element.fburl != null &&
        props.element.fburl !== '' ) {

        ctaelems.push({
          href : props.element.fburl,
          className : 'fb',
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-facebook',
          text : 'facebook'
        });

      }

      // Sets instagram link
      if ( props.element.insta != null &&
        props.element.insta !== '' ) {

        ctaelems.push({
          href : props.element.insta,
          viewBox : '0 0 20 20',
          xlinkHref : '#icon-instagram',
          text : 'instagram',
        });

      }

      // Sets website link
      if ( props.element.link != null &&
        props.element.link !== '' ) {

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
