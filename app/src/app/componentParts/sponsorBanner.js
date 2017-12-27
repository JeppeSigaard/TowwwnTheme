

// SponsorBanner
const React = require( 'react' );
class SponsorBanner extends React.Component {

    // Ctor
    constructor() {
        super();

    }

    // Render
    render() {
        if(this.props.type == null) return '';
        return ( <div className="e" ></div> );
    }
} module.exports = SponsorBanner;
