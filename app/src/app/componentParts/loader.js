

// Loader
const React = require( 'react' );
class Loader extends React.Component {
    
    // Ctor
    constructor() { super(); }
    
    // Render
    render() {
        return (
            <div className="loader-outer">
                <div className="loader-line loader-line-1"></div>
                <div className="loader-line loader-line-2"></div>
                <div className="loader-line loader-line-3"></div>
            </div>
        );
    }
} module.exports = Loader;

