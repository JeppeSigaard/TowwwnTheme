

// Imports
import React from 'react';
import Fader from '../../presentationals/fader.js';

// Actions
import { close_docs } from '../../actions/ui/docsui.js';
 

// Docs Component
class Docs extends React.Component {

  // Constructor
  constructor ( props ) {
    super ( props );
    this.state = {

      visible : false,
      shifted : false,
      
      currentelement : 0,
      elements : [
        
        { title : 'First text', text : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' },
        { title : 'Second text', text : 'Second ipsum', },
        { title : 'Third text', text : 'Third ipsum', },
        { title : 'Fourth text', text : 'Fourth ipsum', },
        { title : 'Fifth text', text : 'Fifth ipsum', },
        { title : 'Sixth text', text : 'Sixth ipsum', },

      ],

    };
  }

  // Render
  render ( ) {

    // Extracts data
    let visible = this.state.visible;
    let shifted = this.state.shifted;
    let elements = this.state.elements;
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
                  { elements.map( this.renderMenuElement.bind( this ) ) }
                  <a href="#" className="sidemenu-close sidemenu-element" onClick={ this.close.bind( this ) } >
                    <div className="text">
                      Close
                    </div>
                  </a>
                </div>

              </div>
            </div>

            <div className="content">
              <Fader index={ currentelement } elements={
                elements.map( this.renderFaderElement.bind( this ) )
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
    let title = val.title;
    let active = this.state.currentelement === this.state.elements.indexOf ( val );
    let onClick = this.onClick.bind( this, 'forward', this.state.elements.indexOf ( val ) );

    // Returns
    return (
      <a href="#" className={ 'sidemenu-element' + (active ? ' active' : '') } 
        key={ 'sidemenu-element#'+val.title } onClick={ onClick } >
        <div className="text">
          { val.title }
        </div>
      </a>
    );

  }

  // Render Fader Element
  renderFaderElement ( val ) {
    return ( 

      <div className="article">
        <div className="title" onClick={ this.onClick.bind( this, 'back' ) } >
          { val.title }

          <div className="close">
            <svg viewBox="0 0 24 24" onClick={ this.close.bind( this ) }>
              <use xlinkHref="#icon-close">
              </use>
            </svg>
          </div>
        </div>

        <div className="text">
          { val.text }
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

    // Resets scroll
    if ( !visible ) { this.refs.body.scrollTo( 0, 0 ); }

    // Sets state
    this.setState ({ visible });

  }

  // Component did mount
  componentDidMount ( ) {
    if ( this.props.store != null ) {
      this.props.store.subscribe ( this.onStoreChange.bind( this ) );
    }
  }

}

// Exports
export default Docs;