


// Single Event
const React = require( 'react' ),
      Linkify = require( 'react-linkify' ).default,
      DataFormatters = require( '../../modules/tools/dataFormatters.js' ),
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' ),

      // Component parts
      ViewTopBar = require( '../componentParts/viewtopbar.js' ),
      SingleViewFooter = require('../componentParts/singleviewfooter.js');

class SingleEvent extends React.Component {

    // Ctor
    constructor( props ) {
        super( props );

        // Extracts img url
        let imgurl = null;
        if ( props.elem.imgurl !== '' &&
             props.elem.imgurl !== null &&
             typeof props.elem.imgurl !== 'undefined' ) {
            imgurl = props.elem.imgurl;
        } else {
            imgurl = 'http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png';
        }

        // Sets state
        this.state = {
            'imgurl' : imgurl,
            'closeviewstate' : {
                'leftview' : 'event-calendar-view',
                'rightview' : 'location-category-view',
                'fromLeft' : false,
                'fromRight' : true,
                'notrans': false,
            },
        };

    }

    // Render
    render() {
        let elem = this.props.elem;
        return (
            <div className="eventsingleview-container">

                {/* Event bar */}
                <ViewTopBar standard={ true } href="#" data-type="location" data-id={ elem.parentid } title={ elem.parentname } other="" closeviewstate={ this.state.closeviewstate } />

                {/* Container */}
                <div className="event-sv-content-container">
                    <div className="event-singleview">

                        {/* Image */}
                        <div className="event-sv-img" style={{ 'backgroundImage' : 'url(' + this.state.imgurl + ')' }} ></div>
                        <div className="event-sv-title" >
                            { elem.name }
                        </div>

                        {/* Start time */}
                        <div className="event-sv-start-time">
                            { DataFormatters.formatDate( elem.start_time, true, true ) }
                        </div>
                        <hr className="linebreak" />

                        {/* CTA Btns */}
                        <div className="es-btns" >
                            <div className="status-btn share" data-link={ 'https://www.facebook.com/events/' + elem.fbid } >
                                <div className="icon">
                                    <svg viewBox="0 0 32 32" >
                                        <use xlinkHref="#icon-facebook"></use>
                                    </svg>
                                </div>
                                <div className="text">Del</div>
                            </div>

                            { event.ticket_uri !== '' && event.ticket_uri !== null &&
                                <div className="status-btn ticket" data-link={ event.ticket_uri } >
                                    <div className="icon">
                                        <svg viewBox="0 0 32 32">
                                            <use xlinkHref="#icon-ticket"></use>
                                        </svg>
                                    </div>
                                    <div className="text">Køb billet</div>
                                </div>
                            }
                        </div>
                        <hr className="lineBreak" />

                        {/* Description */}
                        <div className="event-sv-desc" >
                            <Linkify>
                                { TextPreproccesors.nl2p( elem.description ) }
                            </Linkify>
                        </div>

                    </div>

                    {/* Footer */}
                    <SingleViewFooter type="event" elem={ elem } />

                </div>
            </div>
        );
    }

} module.exports = SingleEvent;
