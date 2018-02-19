

// Imports
import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

// Notifications component
class Notifications extends React.Component {

  // Constructor
  constructor ( props ) {
    super ( props );
    this.state = {
      ids : [ ], 
    };
  }

  // Render
  render ( ) {
    return (
      <div className="notifications">
        { this.state.ids.map ( this.renderNotification.bind(this) ) }
      </div>
    );
  }

  // Render Notification
  renderNotification ( id ) {

    // Extracts data
    let state = this.props.store.getState ( );
    let oldNotifications = state.ui.notifications;

    // Formats data
    let newNotifications = { };
    for ( let n = 0; n < oldNotifications.length; n++ ) {
      newNotifications[oldNotifications[n].id] = oldNotifications[n];
    }
    
    // Returns
    return (
      <div className="notification"
        key={ 'notification#'+id }
        ref={ 'notification#'+id } >

        <div className="icon">
          <svg viewBox="0 0 24 24">
            <use xlinkHref="#icon-info">
            </use>
          </svg>
        </div>

        <div className="text">
          { newNotifications[id].text }
        </div>
      
      </div>
    );

  }

  // Update notifications
  updateNotifications ( ) {
    
    // Extracts data
    let state = this.props.store.getState ( );
    let oldNotifications = state.ui.notifications;

    // Formats data
    let newNotifications = { };
    for ( let n = 0; n < oldNotifications.length; n++ ) {
      newNotifications[oldNotifications[n].id] = oldNotifications[n];
    }

    // Generates new ids list
    let ids = this.state.ids.filter (( val ) => {
    
      // Extracts data
      let element = newNotifications[ val ];
      let now = (new Date()).getTime();
      let liveTime = 6; // Seconds
      
      // Add transition classes
      if ( now - element.timeCreated >= (liveTime-1) * 1000 + 500 ) {
        this.refs['notification#'+val].classList.remove( 'hasMounted' );
      } else if ( !this.refs['notification#'+val].classList.contains('hasMounted') ) {
        this.refs['notification#'+val].classList.add( 'hasMounted' );
      }

      // Remove?
      return now - element.timeCreated <= liveTime * 1000; // 3 seconds

    });

    // Sets state
    this.setState({ ids });

  }

  // Remove notification
  removeNotification ( id ) {
    return this.state.ids.filter(( val ) => {
      return val !== id;
    });
  }

  // On Store Change
  onStoreChange ( ) {

    // Extracts data
    let state = this.props.store.getState();
    let ids = state.ui.notifications.map (( val ) => {
      return val.id;
    });

    // Sets state
    this.setState({ ids });

  }

  // Component did mount
  componentDidMount ( ) {
    if ( this.props.store != null ) {
      this.props.store.subscribe ( this.onStoreChange.bind(this) );
      this.interval = setInterval(( ) => {
        this.updateNotifications ( );
      }, 100 );
    }
  }

  // Componen will unmount
  componentWillUnmount ( ) {
    if ( this.interval != null ) {
      clearInterval ( this.interval );
    }
  }

}

// Exports
export default Notifications;