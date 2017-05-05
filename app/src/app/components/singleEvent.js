// Single Event
const React = require( 'react' ),
      Linkify = require( 'react-linkify' ).default,
      DataFormatters = require( '../../modules/tools/dataFormatters.js' ),
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' ),
      Globals = require( '../globals.js' ),
      _ = require('../../modules/libaries/underscore/underscore_main.js'),

      // Component parts
      SingleViewFooter = require('../componentParts/singleviewfooter.js');

class SingleEvent extends React.Component {

    // Ctor
    constructor( props ) {
        super( props );
        this.sharelink = props.elem.fbid != null ? ( 'https://www.facebook.com/events/' + props.elem.fbid ) : null;
        this.state = {
            imgurl : ( props.elem.imgurl != null ? props.elem.imgurl : '' ),
        };
    }

    // Render
    render() {
        let elem = this.props.elem;
        return (
            <div className="eventsingleview-container">

                {/* Container */}
                <div className="event-sv-content-container">
                    <div className="event-singleview">

                        {/* Image */}
                        <div className="event-sv-img" style={{ 'backgroundImage' : 'url(' + this.state.imgurl }} ></div>
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
                            <a className="status-btn share fb-xfbml-parse-ignore"
                               href={ "https://www.facebook.com/sharer/sharer.php?u="+
                                    encodeURI( 'https://www.facebook.com/events/' + this.props.elem.fbid ).replace( /%5B/g, '[' ).replace( /%5D/g, ']') +"&amp;src=sdkpreparse" }
                               onClick={ this.share.bind(this) } data-prevent>
                                <div className="icon">
                                    <svg viewBox="0 0 32 32" >
                                        <use xlinkHref="#icon-facebook"></use>
                                    </svg>
                                </div>
                                <div className="text">Del</div>
                            </a>

                            { elem.ticket_uri !== '' && elem.ticket_uri !== null &&
                                <a className="status-btn ticket" target="_blank" href={ elem.ticket_uri != null ? elem.ticket_uri : '#' } >
                                    <div className="icon">
                                        <svg viewBox="0 0 32 32">
                                            <use xlinkHref="#icon-ticket"></use>
                                        </svg>
                                    </div>
                                    <div className="text">Køb billet</div>
                                </a>
                            }
                        </div>
                        <hr className="lineBreak" />

                        {/* Description */}
                        <div className="event-sv-desc" >
                            <Linkify>
                                { TextPreproccesors.nl2p( TextPreproccesors.ripRep( elem.description ) ) }
                            </Linkify>
                        </div>

                    </div>

                    {/* Footer */}
                    <SingleViewFooter type="event" elem={ elem } />

                </div>
            </div>
        );
    }

    // Share
    share() { if ( this.sharelink != null ) Globals.fb.share( this.sharelink ); }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {

        if( nextProps.elem !== this.latsElem ){
            _('#event-single-view .scroll-container').get()[0].scrollTop = 0;
            this.lastElem = nextProps.elem
        }

        this.sharelink = 'https://www.facebook.com/events/' + nextProps.elem.fbid;

        // Extracts img url
        let imgurl = null;
        if ( nextProps.elem.imgurl !== '' &&
             nextProps.elem.imgurl !== null &&
             typeof nextProps.elem.imgurl !== 'undefined' ) {
            imgurl = nextProps.elem.imgurl;
        } else {
            imgurl = '';
        }

        // Sets state
        this.setState({
            imgurl : imgurl,
        });

    }

} module.exports = SingleEvent;
