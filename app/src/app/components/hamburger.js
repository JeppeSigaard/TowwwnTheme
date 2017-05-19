


// Hameburger
const React = require( 'react' );
class Hamburger extends React.Component {

    // Constructor
    constructor() {
        super();
        this.state = { };
    }

    // Render
    render() {
        return (
            <div className="hamburger">
                { this.props.navelems }
            </div>
        );
    }

} module.exports = Hamburger;
