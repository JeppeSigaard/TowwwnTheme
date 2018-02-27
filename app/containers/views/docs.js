

// Imports
import React from 'react';
import Fader from '../../presentationals/fader.js';
import { nl2p } from '../../tools/formatters.js';

// Actions
import { close_docs } from '../../actions/ui/docsui.js';
import { getDocs } from '../../actions/api/docs.js';


// Docs Component
class Docs extends React.Component {

  // Constructor
  constructor ( props ) {
    super ( props );
    this.state = {

      visible : false,
      shifted : false,
      
      currentelement : 0,
      ids : [ ],

    };
  }

  // Render
  render ( ) {

    // Extracts data
    let visible = this.state.visible;
    let shifted = this.state.shifted;
    let ids = this.state.ids;
    let currentelement = this.state.currentelement;

    // Returns
    return (
      <div className={ 'docs' + ( visible ? ' visible' : '' ) }>
        <div className="docs-inner" ref="body">

          <div className={ 'docs-body' + ( shifted ? ' shifted' : '' ) }>
            <div className="sidemenu">
            
              <div className="sidemenu-inner">

                <div className="sidemenu-header">
                  <svg viewBox="0 0 16 32">
                    <use xlinkHref="#icon-info">
                    </use>
                  </svg>
                </div>

                <div className="sidemenu-elements">
                  { ids.map( this.renderMenuElement.bind( this ) ) }
                  <a href="#" className="sidemenu-close sidemenu-element" 
                    onClick={ this.close.bind( this ) } >
                    
                    <div className="text">
                      Close
                    </div>

                  </a>
                </div>

              </div>
            </div>

            <div className="content">
              <Fader index={ currentelement } elements={
                ids.map( this.renderFaderElement.bind( this ) )
              }/>
            </div>
            
          </div>

        </div>
      </div>
    );

  }

  // Render Menu Element
  renderMenuElement ( val ) {

    // Extracts data
    let state = this.props.store.getState();
    let elem = state.docs.elements[ val ];

    let title = elem.title;
    let active = this.state.currentelement === this.state.ids.indexOf ( val );
    let onClick = this.onClick.bind( this, 'forward', this.state.ids.indexOf ( val ) );

    // Returns
    return (
      <a href="#" className={ 'sidemenu-element' + (active ? ' active' : '') } 
        key={ 'sidemenu-element#'+title } onClick={ onClick } >
        <div className="text">
          { title }
        </div>
      </a>
    );

  }

  // Render Fader Element
  renderFaderElement ( val ) {

    // Extracts data
    let state = this.props.store.getState();
    let elem = state.docs.elements[ val ];

    // Returns
    return ( 

      <div className="article">
        <div className="title" onClick={ this.onClick.bind( this, 'back' ) } >
          { elem.title }

          <div className="close">
            <svg viewBox="0 0 24 24" onClick={ this.close.bind( this ) }>
              <use xlinkHref="#icon-close">
              </use>
            </svg>
          </div>
        </div>

        <div className="text">
          { nl2p( elem.content ) }
        </div>
      </div>
      
    );

  }

  // On Click
  onClick ( action, index ) {
    if ( 'forward' === action ) {
      
      this.setState({
        currentelement : index,
        shifted : true,
      });

    } else if ( 'back' === action ) {

      this.setState({
        shifted : false,
      });

    }
  }

  // Close
  close ( ) {
    if ( this.props.store != null ) {
      this.props.store.dispatch ( close_docs () );
    }
  }

  // On Store Change
  onStoreChange ( ) {

    // Extracts data
    let state = this.props.store.getState ( );
    let visible = state.docsui.visible;

    let docs = state.docs.elements;
    let ids = Object.keys( docs );

    // Resets scroll
    if ( !visible ) { this.refs.body.scrollTo( 0, 0 ); }

    // Sets state
    this.setState ({ visible, ids });

  }

  // Component did mount
  componentDidMount ( ) {
    if ( this.props.store != null ) {
      this.props.store.subscribe ( this.onStoreChange.bind( this ) );
      this.props.store.dispatch( getDocs() );
    }
  }

}

// Exports
export default Docs;