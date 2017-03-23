


// Single View Footer
const React = require( 'react' );
class SingleViewFooter extends React.Component {

    // Ctor
    constructor() { super(); }
    
    // Component did update
    componentDidUpdate() {
        let placeholders = document.getElementsByClassName('sv-footer-placeholder'),
            footers = document.getElementsByClassName('sv-footer');
        
        for ( let i = 0; i < footers.length; i++ ) {
            placeholders[i].style.width = '100%';
            placeholders[i].style.height = window.getComputedStyle( footers[i] ).height;
        }
    }
    
    // Render
    render() {
        let elem = this.props.elem,
            type = this.props.type,
            picture = null,
            name = null,
            id = null,
            website = null,
            phone = null,
            adress = null;

        if ( type === 'event' ) {

            picture = elem.parentpicture;
            name = elem.parentname;
            id = elem.parentfbid;

        } else if ( type === 'location' ) { 
            
            picture = elem.picture;
            name = elem.name;
            id = elem.fbid;
            
        }
        
        if ( elem.website != null &&
             typeof elem.website !== 'undefined' ) {
            website = elem.website;
        }

        if ( elem.phone != null &&
             typeof elem.phone !== 'undefined' ) {
            phone = elem.phone;
        }

        if ( elem.adress != null &&
             typeof elem.adress !== 'undefined' ) {
            adress = elem.adress;
        }
        
        return (

            <div>
                <div className="sv-footer-placeholder"></div>
                <footer className="sv-footer" >

                    {/* Title */}
                    <div className="sv-footer-block title">
                        <div className="icon" style={ picture != null ? { 'backgroundImage' : 'url('+ picture +')' } : {} } ></div>
                        <div className="value" >{ name }</div>
                    </div>

                    {/* Facebook */}
                    <div className="sv-footer-block clickable" data-link={ 'http://fb.com/' + id } >
                        <div className="icon">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-facebook"></use>
                            </svg>
                        </div>
                        <div className="value">
                            { name }
                        </div>
                    </div>

                    {/* Website */}
                    { website !== null &&
                        <div className="sv-footer-block clickable" data-link={ website } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-web"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { website }
                            </div>
                        </div>
                    }

                    {/* Phone */}
                    { phone !== null &&
                        <div className="sv-footer-block clickable" data-link-type="redirect" data-link={ 'tel://' + phone } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-phone"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { phone }
                            </div>
                        </div>
                    }

                    {/* Adress */}
                    { phone !== null &&
                        <div className="sv-footer-block clickable" data-link={ 'https://google.dk/maps/search/'+adress+',svendborg' } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-address"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { adress }
                            </div>
                        </div>
                    }

                </footer>
            </div>

        );
    }

} module.exports = SingleViewFooter;
