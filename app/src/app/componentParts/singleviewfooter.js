


// Single View Footer
const React = require( 'react' );
class SingleViewFooter extends React.Component {

    // Ctor
    constuctor() { super(); }

    // Render
    render(  ) {
        let elem = this.props.elem,
            type = this.props.type,
            picture = null,
            name = null,
            id = null,
            website = null,
            phone = null,
            adress = null;

        if ( type === 'event' ) {

            // Event data
            picture = elem.parentpicture;
            name = elem.parentname;
            id = elem.parentid;

            if ( elem.website !== null &&
                 typeof elem.website !== 'undefined' ) {
                website = elem.website;
            }

            if ( elem.phone !== null &&
                 typeof elem.phone !== 'undefined' ) {
                phone = elem.phone;
            }

            if ( elem.adress !== null &&
                 typeof elem.adress !== 'undefined' ) {
                adress = elem.adress;
            }

        } else {

            // Location data

        }

        return (
            <div className="sv-footer">
                <div className="sv-footer-block title">
                    <div className="icon" style={ picture !== null && { 'background-image' : 'url('+ picture +')' }} ></div>
                    <div className="value" >{ name }</div>
                </div>

                <div className="sv-footer-block clickable" data-link={ 'http://fb.com/' + id } >
                    <div className="icon">
                        <svg viewbox="0 0 32 32">
                            <use xlinkHref="#icon-facebook"></use>
                        </svg>
                    </div>
                    <div class="value">
                        { name }
                    </div>
                </div>
            </div>
        );
    }

} module.exports = SingleViewFooter;
