// Category Filter button
const React = require( 'react' ),
       _ = require( '../../modules/libaries/underscore/underscore_main.js' ),
       Globals = require( '../globals.js' );
class SectionHeader extends React.Component {

    // Ctor
    constructor() {
        super();

        this.id = null;
        this.state = { collapsed: false};
    }

    collapse(e){
        if (this.props.in !== e.header) return;
        this.setState({collapsed : e.collapse})
    }

    // Component Will Mount
    componentWillMount(){
        this.id = (this.props.name != null) ? this.props.name : 'sh-' + new Date().getTime();
        // Globals.hooks.add('collapse-header', this.collapse.bind(this));
    }

    // Render
    render() {

        let classes = 'section-header';
        if(this.state.collapsed == true) classes += ' collapse';

        return (
            <header className={classes} id={this.id}>
                {this.props.children}
            </header>
        );
    }
} module.exports = SectionHeader;
