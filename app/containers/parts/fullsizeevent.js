

// Imports
import React from 'react';
import Linkify from 'react-linkify';

// Components
import SingleFooter from '../parts/singlefooter.js';
import CTAIcons from '../../presentationals/parts/ctaicons.js';

// Actions & tools
import { getSinglePlace } from '../../actions/api/places.js';
import { formatDate, decodeEntities, nl2p } from '../../tools/formatters.js';

// Full size event component
class FullSizeEvent extends React.Component {

  // Constructor
  constructor() {
    super();
    this.state = {
      ctaelems : [ ],
    };
  }

  // Render
  render() {
    return (
      <div className="single-event">
        { this.props.event != null && <div className="single-event-inner">

          {/* Image */}
          <div className="single-event-image"
            style={{ backgroundImage : 'url('+this.props.imgUrl+')' }}>

            <CTAIcons elements={this.state.ctaelems} />

          </div>

          {/* Top */}
          <div className="single-event-top">
            <div className="parent">{ this.props.event['parentname'] }</div>
            <div className="title">{ decodeEntities(this.props.event['title']) }</div>
            <div className="time">
              { formatDate(new Date(this.props.event['start_time']), true) }
            </div>
          </div>

          {/* Desc */}
          { this.props.event['description'] != null &&
            <div className="single-event-desc">
              <Linkify>
                { nl2p(decodeEntities(this.props.event['description'])) }
              </Linkify>
            </div>
          }

          {/* Footer */}
          <SingleFooter element={ this.props.event } elementType="event"
            store={this.props.store} />

        </div> }
      </div>
    );
  }

  // Render hours
  renderHours( day ) {

    // Preset fields
    let days = {
      'mon' : 'Mandag',
      'tue' : 'Tirsdag',
      'wed' : 'Onsdag',
      'thu' : 'Torsdag',
      'fri' : 'Fredag',
      'sat' : 'Lørdag',
      'sun' : 'Søndag',
    };

    // Returns
    return (
      <div className="hours-row" key={'single-event-hours-day#'+day}>
        { days[day] + ':' }

        <div className="time">
          { this.props.hours[day][0] + ' - ' +
            this.props.hours[day][1] }
        </div>
      </div>
    );

  }

  // Share
  share(e) {

    // Prevents redirect
    e.preventDefault();

    // Share dialog
    FB.ui({
      method: 'share',
      href: ('https://facebook.com/'+this.props.event['fbid']),
    }, (( ) => {  }));

  }

  // Update call to action elements
  updateCallToActionElements( props ) {
    if ( props.event != null ) {

      // Creates response field
      let ctaelems = [ ];

      // Facebook sjiz
      if ( props.event['fbid'] != null ) {

        // Facebook link
        ctaelems.push({
          href : 'http://fb.com/'+props.event['fbid'],
          className : 'fb',
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-facebook',
          text : 'facebook',
        });

        // Facebook share
        ctaelems.push({
          href : 'http://fb.com/'+props.event['fbid'],
          onClick : this.share.bind(this),
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-share',
          text : 'del nu',
        });

      }

      // Ticket link
      if ( props.event['ticket_uri'] != null ) {
        ctaelems.push({
          href : props.event['ticket_uri'],
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-ticket',
          text : 'billet'
        });
      }

      // Sets state
      this.setState({ ctaelems });

    }
  }

  // Component will receive props
  componentWillReceiveProps( nextProps ) {
    this.updateCallToActionElements( nextProps );
  }

}

// Exports
export default FullSizeEvent;
