

// Single Location
const React = require( 'react' ),
      Globals = require( '../globals.js' ),
      Event = require( './event.js' ),
      
      Linkify = require( 'react-linkify' ).default,
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' );

class SingleLocation extends React.Component {
    
    // Ctor
    constructor() { 
        super(); 
        this.state = { 'jsxEvents' : null };
    }
    
    // Component will receive props
    componentWillReceiveProps( nextProps ) {
        if ( nextProps.elem !== this.props.elem ) {
            this.setState({ 'jsxEvents' : null });
            Globals.eventDataHandler.getEvents({
                'parent' : nextProps.elem.id
            }).then(( resp ) => {
                let jsxEvents = [];
                for ( let eventData of resp ) {
                    jsxEvents.push( <Event elem={ eventData } style={{ width : (100/resp.length) + '%' }} /> );
                } this.setState({ 'jsxEvents' : jsxEvents });
            });
        }
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
                
                <div className="description-container">
                    <div className="title">{ elem.name }</div>
                    <div className="description">
                        <Linkify>
                            { TextPreproccesors.nl2p( TextPreproccesors.ripRep( elem.description ) ) }
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
                        
                        <div className="inner" style={{ width : (this.state.jsxEvents.length/3*100) +'%' }} >
                            { this.state.jsxEvents }
                        </div>
                    </div>
                }
            </div>
        );
    }
    
} module.exports = SingleLocation;
