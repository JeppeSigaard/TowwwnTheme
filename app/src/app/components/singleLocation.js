

// Single Location
const React = require( 'react' ),
      Linkify = require( 'react-linkify' ).default,
      TextPreproccesors = require( '../../modules/tools/textPreproccesors.js' );

class SingleLocation extends React.Component {
    
    // Ctor
    constructor() { super(); }
    
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
                    <div className="title">Om { elem.name }</div>
                    <div className="description">
                        <Linkify>
                            { TextPreproccesors.nl2p( elem.description ) }
                        </Linkify>
                    </div>
                </div>
                <div className="breakline"></div>
                
                
            </div>
        );
    }
    
} module.exports = SingleLocation;