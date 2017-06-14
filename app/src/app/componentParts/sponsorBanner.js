

// SponsorBanner
const React = require( 'react' );
class SponsorBanner extends React.Component {

    // Ctor
    constructor() { super();}

    // Render
    render() {
        return (
            <div className="sponsor-banner" style={{backgroundImage : 'url(' +this.props.item.img_search + ')'}}>
                <a  href={this.props.item.link} target="_blank" className="sponsor-banner-footer">
                    <div className="sponsor-banner-icon" style={{backgroundImage : 'url(' +this.props.item.img_logo + ')'}}></div>
                    <div className="sponsor-banner-text">
                        <span className="sponsor-banner-title">{this.props.item.title}</span>
                        <span className="sponsor-banner-subtitle">{this.props.item.subtitle}</span>
                    </div>
                </a>
            </div>
        );
    }
} module.exports = SponsorBanner;

