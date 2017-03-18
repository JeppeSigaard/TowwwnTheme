

// Single Location
const React = require( 'react' ),
      ts = require( '../../modules/plugins/towwwnSelector.js' ).default,
      Globals = require( '../globals.js' ),
      Event = require( './event.js' ),
      SingleViewFooter = require( '../componentParts/singleviewfooter.js' ),
      
      Linkify = require( 'react-linkify' ).default,
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' ),
      TowwwnSlider = require( '../../modules/plugins/slider.js' );

class SingleLocation extends React.Component {
    
    // Ctor
    constructor() { 
        super(); 
        this.state = { 
            jsxEvents : null,
            slider : new TowwwnSlider(),
            eventVref : {
                leftView : 'location-single-view',
                rightView : 'event-single-view',
                fromLeft : false,
                fromRight : true
            },
        };
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.elem !== this.props.elem ) {
            this.setState({ 'jsxEvents' : null });
            Globals.eventDataHandler.getEvents({
                'parent' : nextProps.elem.id
            }).then(( resp ) => {
                
                // Generates elems
                let jsxEvents = [];
                for ( let eventData of resp ) {
                    jsxEvents.push( <Event elem={ eventData } name={ this.props.name } vref={ this.state.eventVref } style={{ width : (100/resp.length) + '%' }} /> );
                }
                
                // Sets state
                if ( jsxEvents <= 0 ) jsxEvents = null;
                this.setState({ 'jsxEvents' : jsxEvents });
                Globals.syncScroll.rescaleContainer();
                
            });
        }
    }
    
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
        let elem = this.props.elem;
        return (
            <div className="location-singleview-content" >
                <div className="photo-container">
                    <div className="coverphoto cta-icon" style={{ 'backgroundImage' : 'url('+ elem.coverphoto +')' }} ></div>
                    <div className="picture" style={{ 'backgroundImage' : 'url('+ elem.picture +')' }} ></div>
                </div>
                
                <div className="cta-icons">
                    { elem.phone != null &&
                        <div className="cta-phone cta-icon" data-link={ 'tel://' + elem.phone } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-phone"></use>
                                </svg>
                            </div>
                        </div>
                    }
                    
                    { elem.website != null &&
                        <div className="cta-website cta-icon" data-link={ elem.website } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-web"></use>
                                </svg>
                            </div>
                        </div>
                    }
                    
                    { elem.fbid != null &&
                        <div className="cta-fb cta-icon" data-link={ 'http://fb.com/' + elem.fbid } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-facebook"></use>
                                </svg>
                            </div>
                        </div>
                    }
                </div>
                <div className="breakline"></div>
                
                { elem.description != null &&
                <div className="description-container">
                    <div className="title">{ elem.name }</div>
                    <div className="description">
                        <Linkify>
                            { TextPreproccesors.nl2p( TextPreproccesors.ripRep( elem.description ) ) }
                        </Linkify>
                    </div>
                </div>
                }
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
                        
                        <div className="inner" style={{ width : (this.state.jsxEvents.length/3*100) +'%' }} >
                            { this.state.jsxEvents }
                        </div>
                    </div>
                }
                
                <SingleViewFooter elem={ elem } type="location" />
            </div>
        );
    }
    
} module.exports = SingleLocation;
