

// Imports
import React from 'react';

// Components
import View from '../../hoc/view.js';
import Event from '../parts/event.js';
import CTAIcons from '../../presentationals/parts/ctaicons.js';

// Actions & tools
import { getSinglePlace } from '../../actions/api/places.js';
import { formatDate, nl2p } from '../../tools/formatters.js';


// Event view component
class EventView extends View {

  // Constructor
  constructor( props ) {
    super(props);
    this.state = {

      event  : null,
      imgUrl : null,
      hours : null,

      ctaelems : [ ],

      id : 'event-view',
      title : 'Begivenhed',
      icon : '#icon-event',
      viewBox : '0 0 32 32',
      closeProps : ['welcome-view','calendar-view','calendar-view',true],

    };
  }

  // Render
  render() {
    return this.generateRender(
      <div className="single-event">
        { this.state.event != null && <div className="single-event-inner">

          {/* Image */}
          <div className="single-event-image"
            style={{ backgroundImage : 'url('+this.state.imgUrl+')' }}>

            <CTAIcons elements={this.state.ctaelems} />

          </div>

          {/* Top */}
          <div className="single-event-top">
            <div className="parent">{ this.state.event['parentname'] }</div>
            <div className="title">{ this.state.event['title'] }</div>
            <div className="time">
              { formatDate(new Date(this.state.event['start_time']), true) }
            </div>
          </div>

          {/* Desc */}
          { this.state.event['description'] != null &&
            <div className="single-event-desc">
              { nl2p(this.state.event['description']) }
            </div>
          }

          {/* Footer */}
          <footer className="single-event-footer">

            {/* Parent */}
            <div className="parent row">
              <div className="image" style={{ backgroundImage :
                'url('+this.state.event['parentpicture']+')' }}>
              </div>

              <div className="text">
                { this.state.event['parentname'] }
              </div>
            </div>

            {/* Hours */}
            { this.state.hours != null &&
              <a className="hours row">
                <div className="icon">
                  <svg viewBox="0 0 32 34">
                    <use xlinkHref="#icon-watch"></use>
                  </svg>
                </div>

                <div className="text">

                  { Object.keys(this.state.hours)
                    .map(this.renderHours.bind(this)) }

                </div>
              </a>
            }

            {/* Phone */}
            { this.state.event['phone'] != null &&
              <a className="phone row" href={'tel://'+this.state.event['phone']}>
                <div className="icon">
                  <svg viewBox="0 0 32 32">
                    <use xlinkHref="#icon-phone"></use>
                  </svg>
                </div>

                <div className="text">
                  { this.state.event['phone'] }
                </div>
              </a>
            }

            {/* Facebook */}
            { this.state.event['fbid'] != null &&
              <a className="facebook row" target="_blank"
                href={'http://fb.com/'+this.state.event['fbid']}>
                <div className="icon">
                  <svg viewBox="0 0 32 32">
                    <use xlinkHref="#icon-facebook"></use>
                  </svg>
                </div>

                <div className="text">Facebook</div>
              </a>
            }

            {/* Website */}
            { this.state.event['website'] != null &&
              <a className="web row" target="_blank"
                href={this.state.event['website']}>
                <div className="icon">
                  <svg viewBox="0 0 32 32">
                    <use xlinkHref="#icon-web"></use>
                  </svg>
                </div>

                <div className="text">
                  { this.state.event['website'] }
                </div>
              </a>
            }

            {/* Adress */}
            { this.state.event['adress'] != null &&
              <a className="adress row" target="_blank"
                href={'https://www.google.dk/maps/place/'+this.state.event['adress']}>
                <div className="icon">
                  <svg viewBox="0 0 32 32" >
                    <use xlinkHref="#icon-location"></use>
                  </svg>
                </div>

                <div className="text">
                  { this.state.event['adress'] }
                </div>
              </a>
            }

          </footer>

        </div> }
      </div>
    );
  }

  // Render siblings
  renderSiblings( id ) {

    // Gets element & checks if it exists
    let element = this.props.store.getState().events.elements[id];
    if (element==null){return <div>Error fetching event</div>;}

    // Creates props & returns event
    let props = { element, large : true, key : 'eventview-sibling#'+id };
    return (<Event {...props} />);

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
      <div className="hours-row" key={"single-event-hours-day#"+day}>
        { days[day] + ':' }

        <div className="time">
          { this.state.hours[day][0] + ' - ' +
            this.state.hours[day][1] }
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
      href: 'fb.com/'+this.state.event['fbid'],
    }, ((response) => {}));

  }

  // Update call to action elements
  updateCallToActionElements( props ) {
    if ( this.state.event != null ) {

      // Creates response field
      let ctaelems = [ ];

      // Facebook sjiz
      if ( this.state.event['fbid'] != null ) {

        // Facebook link
        ctaelems.push({
          href : 'http://fb.com/'+this.state.event['fbid'],
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-facebook',
          text : 'facebook',
        });

        // Facebook share
        ctaelems.push({
          href : 'http://fb.com/'+this.state.event['fbid'],
          onClick : this.share.bind(this),
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-share',
          text : 'del nu',
        });

      }

      // Ticket link
      if ( this.state.event['ticket_uri'] != null ) {
        ctaelems.push({
          href : this.state.event['ticket_uri'],
          viewBox : '0 0 32 32',
          xlinkHref : '#icon-ticket',
          text : 'billet'
        });
      }

      // Sets state
      this.setState({ ctaelems });

    }
  }

  // On store change
  onStoreChange() {

    // Gets state
    const state = (this.props.store.getState());

    // Sets event
    if ( state.ui.shown_single_event != null ) {

      // Gets event
      let event = state.events.elements[String(state.ui.shown_single_event)];

      // Gets smallest event image above 400px
      let imgUrl = event.images[(Object.keys(event.images).filter(( size ) => {
        return parseInt(size) > 600;
      }))[0]];

      // If no image above 400px found, take largest there is
      if ( imgUrl == null ) {
        imgUrl = event.images[Object.keys(event.images)
          [Object.keys(event.images).length-1]];
      }

      // If parent not loaded,
      // well, fetch it!:))
      let parent = state.places.elements[event['parentid']];
      if ( parent == null && !state.places.fetching ) {
        this.props.store.dispatch(getSinglePlace(event['parentid']));
      }

      // Else? set hours.
      let hours = null;
      if ( parent != null ) {
        let tmphours = JSON.parse( parent['hours'] );
        if ( tmphours != null && Object.keys(tmphours).length>=1 ) {
          hours = tmphours;
        }
      }

      // Sets new state
      // Callback included
      // to get siblings
      this.setState({
        event, imgUrl, hours,
        title : event['title']
      }, () => {

        // Updates call to action elements
        this.updateCallToActionElements();

      });

    }

  }

  // Component will mount
  componentWillMount() {

    // Subsribes to store
    if ( this.props.store != null ) {
      this.props.store.subscribe(this.onStoreChange.bind(this));
    }

  }

}

// Exports
export default EventView;
