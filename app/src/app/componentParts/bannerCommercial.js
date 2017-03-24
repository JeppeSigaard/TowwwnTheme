

// Banner commercial
const React = require( 'react' );
class BannerCommercial extends React.Component {

    // Render
    render() {
        return (
            <a className="bannerCommercial"
                href={ this.props.elem.link }
                target='_blank'
                style={{ backgroundImage : 'url('+this.props.elem.commercial_tn_medium+')' }} >
            </a>
        );
    }

} module.exports = BannerCommercial;
