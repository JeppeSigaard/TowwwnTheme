

// Single Location
const React = require( 'react' ),
      _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
      Globals = require( '../globals.js' ),
      Event = require( './event.js' ),
      SingleViewFooter = require( '../componentParts/singleviewfooter.js' ),

      Linkify = require( 'react-linkify' ).default,
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' ),
      TowwwnSlider = require( '../../modules/libaries/slider.js' );

class SingleLocation extends React.Component {

    // Ctor
    constructor() {
        super();
        this.state = {
            jsxEvents : null,
            smallscreen : false,
            slider : new TowwwnSlider(),
            eventVref : {
                leftView : '#event-single-view',
                rightView : '#location-single-view',
                fromLeft : false,
                fromRight : true,
                mobile : {
                    view: '#event-single-view',
                    fromLeft: false,
                    fromRight: true,
                }
            },
        };

        // Event Handlers
        _(window).on( 'resize', this.onResize.bind(this) );
    }

    // Load events
    loadEvents( nextProps ) {
        if ( nextProps.elem !== this.lastLoaded ) {
            this.setState({ 'jsxEvents' : null });
            this.lastLoaded = nextProps.elem;
            Globals.eventDataHandler.getEvents({
                'parent' : nextProps.elem.id,
                'per_page' : '1000',
                'after' : 'now'
            }).then(( resp ) => {
                if(resp.length > 0){
                    this.setEvents(resp);
                    return;
                }

                Globals.eventDataHandler.getEvents({
                    'parent' : nextProps.elem.id,
                    'per_page' : '1000',
                    'before' : 'now'
                }).then(( resp ) => {

                    this.setEvents(resp);
                    return;

                });

            });
        }
    }

    // Set events
    setEvents(resp){
        // Generates elems
        let jsxEvents = [];
        for ( let eventData of resp ) {
            jsxEvents.push( <Event elem={ eventData } key={ 'eventslide-'+eventData.id } name={ this.props.name } vref={ this.state.eventVref } style={{ width : (100/resp.length) + '%' }} /> );
        }

        // Sets state
        if ( jsxEvents <= 0 ) jsxEvents = null;
        this.setState({ 'jsxEvents' : jsxEvents });
    }

    // Resize
    onResize() {
        if ( _(window).width() <= 1000 ) this.setState({ smallscreen: true });
        else this.setState({ smallscreen: false });
    }

    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        this.loadEvents( nextProps );

        if( nextProps.elem !== this.lastElem ){
            _('#location-single-view .scroll-container').get()[0].scrollTop = 0;
            this.lastElem = nextProps.elem
        }
    }
    componentDidMount() { this.onResize(); this.loadEvents( this.props ); }

    // Component did update
    componentDidUpdate() {

        // Inits slider
        this.state.slider.initSlider({
            outer : '.location-singleview-content .event-slider',
            prevButtonClass : 'prevButton',
            nextButtonClass : 'nextButton',
            innerClass : 'inner',
        });

    }

    // Render
    render() {
        let elem = this.props.elem,
            description = (elem.description != null && elem.description.length > 10) ? elem.description : elem.about;
        return (
            <div className="location-singleview-content" >
                <div className="photo-container">
                    <div className="coverphoto cta-icon" style={{ 'backgroundImage' : 'url('+ elem.coverphoto +')' }} ></div>
                    <div className="picture" style={{ 'backgroundImage' : 'url('+ elem.picture +')' }} ></div>
                </div>

                <div className="cta-icons">
                    { elem.phone != null &&
                        <a className="cta-phone cta-icon" href={'tel://' + elem.phone} data-link={ 'tel://' + elem.phone } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-phone"></use>
                                </svg>
                            </div>
                        </a>
                    }

                    { elem.website != null &&
                        <a className="cta-website cta-icon" href={elem.website} data-link={ elem.website } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-web"></use>
                                </svg>
                            </div>
                        </a>
                    }

                    { elem.fbid != null &&
                        <a className="cta-fb cta-icon" href={'http://fb.com/' + elem.fbid} data-link={ 'http://fb.com/' + elem.fbid } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-facebook"></use>
                                </svg>
                            </div>
                        </a>
                    }
                </div>
                <div className="breakline"></div>
                <div className="description-container">
                    <div className="description">
                        <Linkify>
                            { TextPreproccesors.nl2p( TextPreproccesors.ripRep( description ) ) }
                        </Linkify>
                    </div>
                </div>
                <div className="breakline"></div>

                { this.state.jsxEvents != null &&
                    <div className="event-slider">
                        <div className="prevButton button">
                            <svg viewBox="0 0 20 20">
                                <use xlinkHref="#chevron-left"></use>
                            </svg>
                        </div>
                        <div className="nextButton button">
                            <svg viewBox="0 0 20 20">
                                <use xlinkHref="#chevron-right"></use>
                            </svg>
                        </div>

                        <div className="inner" style={{ width : ( this.state.smallscreen ?
                                                                    (this.state.jsxEvents.length/2*100) :
                                                                    (this.state.jsxEvents.length/3*100) ) +'%' }} >
                            { this.state.jsxEvents }
                        </div>
                    </div>
                }

                <SingleViewFooter elem={ elem } type="location" />
            </div>
        );
    }

} module.exports = SingleLocation;
