


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
    
    componentDidMount(){
        this.componentDidUpdate();
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
            phone_link = null,
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
                phone_link = 'tel://' + elem.phone.replace(' ','');
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
                    <a className="sv-footer-block clickable" target="_blank" href={ 'http://fb.com/' + id + '?ref="towwwn"'} >
                        <div className="icon">
                            <svg viewBox="0 0 32 32">
                                <use xlinkHref="#icon-facebook"></use>
                            </svg>
                        </div>
                        <div className="value">
                            { name }
                        </div>
                    </a>

                    {/* Website */}
                    { website !== null &&
                        <a className="sv-footer-block clickable" target="_blank" href={ website + '?ref="towwwn"'} >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-web"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { website }
                            </div>
                        </a>
                    }

                    {/* Phone */}
                    { phone !== null &&
                        <a className="sv-footer-block clickable" href={phone_link} >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-phone"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { phone }
                            </div>
                        </a>
                    }

                    {/* Adress */}
                    { phone !== null &&
                        <a className="sv-footer-block clickable" target="_blank" href={ 'https://google.dk/maps/search/'+adress+',svendborg' } >
                            <div className="icon">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-address"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { adress }
                            </div>
                        </a>
                    }

                </footer>
            </div>

        );
    }

} module.exports = SingleViewFooter;
