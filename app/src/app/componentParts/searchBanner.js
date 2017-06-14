

// SearchBanner
const React = require( 'react' );
class SearchBanner extends React.Component {

    // Ctor
    constructor() { super();}

    // Render
    render() {
        return (
            <div className="search-banner" style={{backgroundImage : 'url(' +this.props.item.img_search + ')'}}>
                <a  href={this.props.item.link} target="_blank" className="search-banner-footer">
                    <div className="search-banner-icon" style={{backgroundImage : 'url(' +this.props.item.img_logo + ')'}}></div>
                    <div className="search-banner-text">
                        <span className="search-banner-title">{this.props.item.title}</span>
                        <span className="search-banner-subtitle">{this.props.item.subtitle}</span>
                    </div>
                </a>
            </div>
        );
    }
} module.exports = SearchBanner;

