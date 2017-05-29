


// Single View Footer
const React = require( 'react' );
class SingleViewFooter extends React.Component {

    // Ctor
    constructor() { super(); }

    // Render
    render() {
        let elem = this.props.elem,
            type = this.props.type,
            picture = null,
            name = null,
            id = null,
            website = null,
            hours = null,
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

            let hoursjson = JSON.parse( elem.hours );
            if ( !Array.isArray( hoursjson ) &&
                 elem.hours != null ) {
                hours = [];
                for ( let day in hoursjson ) {
                    let dayformatted = day === 'mon' ? 'Mandag' :
                            ( day === 'tue' ? 'Tirsdag' :
                            ( day === 'wed' ? 'Onsdag' :
                            ( day === 'thu' ? 'Torsdag' :
                            ( day === 'fri' ? 'Fredag' :
                            ( day === 'sat' ? 'Lørdag' :
                            ( day === 'sun' ? 'Søndag' : 'Smamodag' ))))));

                    hours.push(
                        <div className="openinghours" key={ 'openinghours-' + day + '-' + elem.fbid } >
                            <div className="day"> { dayformatted + ':' } </div>
                            <div className="time"> { hoursjson[day][0] + ' - ' + hoursjson[day][1] }</div>
                        </div>
                    );
                }
            }
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
                    { website != null &&
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
                    { phone != null &&
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

                    {/* Hours */}
                    { hours != null &&
                        <div className="sv-footer-block" >
                            <div className="icon topaligned">
                                <svg viewBox="0 0 32 32">
                                    <use xlinkHref="#icon-watch"></use>
                                </svg>
                            </div>
                            <div className="value">
                                { hours }
                            </div>
                        </div>
                    }

                    {/* Adress */}
                    { adress != null &&
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
