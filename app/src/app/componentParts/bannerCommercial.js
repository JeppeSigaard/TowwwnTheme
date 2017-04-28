

// Banner commercial
const React = require( 'react' );
class BannerCommercial extends React.Component {

    // Render
    render() {
        return this.props.elem != null &&
               this.props.elem.commercial_tn_medium != null &&

            <a className="bannerCommercial"
                href={ this.props.elem.link }
                target='_blank'
                style={{ backgroundImage : 'url('+this.props.elem.commercial_tn_medium+')' }} >
                {/*<div className="title">
                    { this.props.elem.title }
                </div>*/}
            </a>;

    }

} module.exports = BannerCommercial;