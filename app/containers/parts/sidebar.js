

// Imports
import React from 'react';

// Components
import ContactForm from '../../presentationals/contactform.js';

// Actions
import { open_docs } from '../../actions/ui/docsui.js';
import { setViewFocus } from '../../actions/ui/views.js';
import { enableModalBox, disableModalBox } from '../../actions/ui/modalbox.js';
import { addNotification } from '../../actions/ui/notifications.js';


// Side bar component
class SideBar extends React.Component {

  // Ctor
  constructor() {
    super();
    this.state = {

      open : true,
      inline : true,
      inlinetrans : false,
      active_type : 'events',

      future_event_count : false,
      place_count : false,

    };
  }

  // Render
  render() {

    // Generates class list
    let className = 'sidebar' + 
      ( this.state.open ? ' forceopen' : '' ) +
      ( this.state.inline ? ' inline' : '' ) +
      ( this.state.inlinetrans ? ' inline-trans' : '' ) +
      ( this.state.notrans ? ' notrans' : '' );

    // Returns
    return (
      <div className={ className } onClick={ this.onClick.bind(this, null) } ref="outer" >

        {/* Header */}
        <header className="topbar">

          <div className="icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#towwwn-logo-17">
              </use>
            </svg>
          </div>

          <div className="town">
            {'Svendborg'}
          </div>

          <div className="buttons">
            <div className="button info" onClick={ this.onClick.bind(this, 'docs') }>
              <svg viewBox="0 0 16 32">
                <use xlinkHref="#icon-info">
                </use>
              </svg>
            </div>
          </div>

        </header>

        {/* Events */}
        <section className={'sidebar-events '+(this.state.active_type==='events'?'active':'')}
          onClick={ this.onClick.bind(this, 'events') } >

          <div className="icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-event">
              </use>
            </svg>
          </div>

          <div className="text">

            { this.state.future_event_count !== false &&
              this.state.future_event_count
            }

            { this.state.future_event_count === false &&
              '. . .'
            }

            <div className="subtext">
              {'Begivenheder'}
            </div>
          </div>

        </section>

        {/* Places */}
        <section className={'sidebar-places '+(this.state.active_type==='places'?'active':'')}
          onClick={ this.onClick.bind(this, 'places') } >

          <div className="icon">
            <svg viewBox="0 0 32 32">
              <use xlinkHref="#icon-location">
              </use>
            </svg>
          </div>

          <div className="text">

            { this.state.place_count !== false &&
              this.state.place_count
            }

            { this.state.place_count === false &&
              '. . .'
            }

            <div className="subtext">
              {'Lokale Steder'}
            </div>
          </div>

        </section>

      </div>
    );

  }

  // On click
  onClick( type, e ) {

    e.stopPropagation(); // <- prevents multiple fires on click (From bubbl.)
    if ( this.props.store == null ) { return; }

    // If type is null or we are in mobile view
    // just open the sidebar
    if ( 'docs' !== type ) {
      if ( (type == null || ( this.props.store != null &&
        this.props.store.getState().mobile.isMobile )) &&
        !this.state.open ) {

        this.setState({ open : true });
        return;

      } else { this.setState({ open : false }); }

    }

    // Else actually open the things
    // Events?
    if ( 'events' === type ) {

      // Dispatches view focus action
      this.props.store.dispatch(setViewFocus(
        'sidebar', 'calendar-view', 'calendar-view',
        'right', false
      ));

      // Sets state
      this.setState({ active_type : 'events' });

    }

    // Or places?
    if ( 'places' === type ) {

      // Dispatches view focus action
      this.props.store.dispatch(setViewFocus(
        'sidebar', 'category-view', 'category-view',
        'right', false
      ));

      // Sets state
      this.setState({ active_type : 'places' });

    }

    // Maybed event docs
    if ( 'docs' === type ) {
      this.props.store.dispatch ( open_docs() );
    }

  }
  // On store change
  async onStoreChange ( ) { // <- ignore eslint error

    // Gets state and creates response field
    let state = this.props.store.getState();
    let response = { };

    // Extracts data
    // Future event count
    if ( state.defaultdata.data.future_event_count != null ) {
      response.future_event_count = state.defaultdata.data.future_event_count;
    }

    // Place count
    if ( state.defaultdata.data.place_count != null ) {
      response.place_count = state.defaultdata.data.place_count;
    }

    // Inline
    if ( state.views.leftview === 'sidebar' ) { response.inline = true; } 
    else { response.inline = false; }

    // Sets transition time
    if ( response.inline !== this.state.inline ) {

      // Extracts data
      let outer = this.refs.outer;
      let style = window.getComputedStyle ( outer );
      let transition = parseFloat ( style.transitionDuration ) * 1000;

      if ( response.inline ) {
        
        outer.classList.add( 'inline' );
        outer.classList.add( 'inline-trans' );
        window.getComputedStyle( outer );

      } else {
        
        outer.classList.remove( 'inline' );
        outer.classList.add( 'inline-trans' );
        window.getComputedStyle( outer );

      }

      // Removes inline transition 
      // ( Await tmp. prevents set state, fixing safari bugg )
      // But damn this code shouldn't be allowed to exits
      await new Promise(( resolve, reject ) => {
        this.inlinetimeout = setTimeout(( ) => {
          
          outer.classList.remove( 'inline-trans' );
          resolve ( );

        }, transition );
      });

    }

    // Sets state
    this.setState ( response );

  }

  // Component will mount
  componentDidMount() {

    this.setState({ notrans : true }, () => {
      this.setState({ notrans : false });
    });

    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }

  }

}

// Exports
export default SideBar;
