// Category Filter button
const React = require( 'react' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' );
class SectionHeader extends React.Component {

    // Ctor
    constructor() {
        super();

        this.id = null;
    }

    // Component Will Mount
    componentWillMount(){
        this.id = (this.props.name != null) ? this.props.name : 'sh-' + new Date().getTime();
    }

    componentDidUpdate(){
        _('#' + this.id).removeClass('collapse');
    }

    // Render
    render() {

        return (
            <header className='section-header' id={this.id}>
                {this.props.children}
            </header>
        );
    }
} module.exports = SectionHeader;
