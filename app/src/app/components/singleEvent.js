// Single Event
const React = require( 'react' ),
      Linkify = require( 'react-linkify' ).default,
      DataFormatters = require( '../../modules/tools/dataFormatters.js' ),
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' ),
      Globals = require( '../globals.js' ),

      // Component parts
      SingleViewFooter = require('../componentParts/singleviewfooter.js');

class SingleEvent extends React.Component {

    // Ctor
    constructor( props ) { 
        super( props ); 
        this.state = {
            imgurl : ( props.elem.imgurl != null ? props.elem.imgurl : 
                      'http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png' ),
        };
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        
        // Extracts img url
        let imgurl = null;
        if ( nextProps.elem.imgurl !== '' &&
             nextProps.elem.imgurl !== null &&
             typeof nextProps.elem.imgurl !== 'undefined' ) {
            imgurl = nextProps.elem.imgurl;
        } else {
            imgurl = 'http://www-mtl.mit.edu/wpmu/marc2016/files/2015/08/placeholder-camera-green.png';
        }

        // Sets state
        this.setState({ imgurl : imgurl });


        // Bump up (plz fix)
        const singleSync = document.querySelectorAll('#event-single-view .sync-outer')[0];
        if(singleSync.scrollTop > 60){
            singleSync.scrollTop = 60;
        }

    }

    componentDidUpdate (obj){
        Globals.syncScroll.rescaleContainer();
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
                            <div className="status-btn share" data-link={ 'https://www.facebook.com/events/' + elem.fbid } >
                                <div className="icon">
                                    <svg viewBox="0 0 32 32" >
                                        <use xlinkHref="#icon-facebook"></use>
                                    </svg>
                                </div>
                                <div className="text">Del</div>
                            </div>

                            { elem.ticket_uri !== '' && elem.ticket_uri !== null &&
                                <div className="status-btn ticket" data-link={ elem.ticket_uri } >
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

} module.exports = SingleEvent;
